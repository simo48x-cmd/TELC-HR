import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  Play,
  Square,
  Radio,
  Globe,
  Upload,
  RotateCcw,
  FastForward,
  CheckCircle2,
  Headphones,
} from 'lucide-react';
import { HoerenExam } from '../data/types';
import { OCI_BUCKET_BASE_URL, REAL_OCI_BUCKET_MP3S } from '../data/hoerenData';
import {
  AudioSourceMode,
  speakGermanExamRadio,
  stopGermanExamRadio,
} from '../utils/audioEngine';

interface AudioPlayerBarProps {
  exam: HoerenExam;
  localAudioMap: Record<string, string>;
  onUploadLocalAudio: (examId: string, file: File) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  exam,
  localAudioMap,
  onUploadLocalAudio,
}) => {
  const hasMappedOciAudio = Boolean(exam.audioSlug);
  const [sourceMode, setSourceMode] = useState<AudioSourceMode>(
    hasMappedOciAudio ? 'cloud-stream' : 'radio-tts'
  );
  const [selectedBucketFile, setSelectedBucketFile] = useState<string>(
    exam.audioSlug || 'Lufthansa.mp3'
  );
  const [triedSecondaryFallback, setTriedSecondaryFallback] = useState<boolean>(false);
  const [activeAudioUrl, setActiveAudioUrl] = useState<string>(
    exam.audioSlug
      ? `${OCI_BUCKET_BASE_URL}${exam.audioSlug}`
      : `${OCI_BUCKET_BASE_URL}Lufthansa.mp3`
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const [progressPct, setProgressPct] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>(
    hasMappedOciAudio
      ? `🎧 أوديو رسمي حقيقي جاهز: ${exam.audioSlug}`
      : '🎙️ راديو ألماني مدمج (de-DE) — أو اختر MP3 من مكتبة الأوديو (56 ملف)'
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cancelTtsRef = useRef<(() => void) | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    stopAllPlayback();
    setProgressPct(0);
    setTriedSecondaryFallback(false);

    if (localAudioMap[exam.id]) {
      setSourceMode('local-file');
      setActiveAudioUrl(localAudioMap[exam.id]);
      setStatusMessage('📂 ملف أوديو محلي جاهز للقراءة المباشرة');
    } else if (exam.audioSlug) {
      setSourceMode('cloud-stream');
      setSelectedBucketFile(exam.audioSlug);
      setActiveAudioUrl(`${OCI_BUCKET_BASE_URL}${exam.audioSlug}`);
      setStatusMessage(`🎧 أوديو رسمي حقيقي مربوط تلقائياً: ${exam.audioSlug}`);
    } else {
      setSourceMode('radio-tts');
      setStatusMessage('🎙️ راديو ألماني مدمج (de-DE) — أو اختر أي MP3 من مكتبة الـ 56 أوديو أعلاه');
    }

    return () => {
      stopAllPlayback();
    };
  }, [exam.id, localAudioMap]);

  const stopAllPlayback = () => {
    if (cancelTtsRef.current) {
      cancelTtsRef.current();
      cancelTtsRef.current = null;
    }
    stopGermanExamRadio();
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const handleBucketFileSelect = (filename: string) => {
    stopAllPlayback();
    setSelectedBucketFile(filename);
    setTriedSecondaryFallback(false);
    const fullUrl = `${OCI_BUCKET_BASE_URL}${filename}`;
    setActiveAudioUrl(fullUrl);
    setSourceMode('cloud-stream');
    setStatusMessage(`🎧 تم اختيار الأوديو الحقيقي: ${filename} — اضغط Play للاستماع`);
  };

  const handleAudioError = () => {
    if (!isPlaying) return;

    // Try secondary fallback for Lufthansa if primary fails
    if (
      !triedSecondaryFallback &&
      exam.audioUrlFallback &&
      exam.audioUrlFallback !== activeAudioUrl
    ) {
      setTriedSecondaryFallback(true);
      setActiveAudioUrl(exam.audioUrlFallback);
      setStatusMessage('🔄 جاري التشغيل من السيرفر الاحتياطي (telccfree.com)...');
      setTimeout(() => {
        audioRef.current?.play().catch(() => {});
      }, 100);
      return;
    }

    setIsPlaying(false);
    setStatusMessage(
      '⚠️ تعذر تحميل هاد الملف الصوتي حالياً — تقدر تختار ملف آخر من القائمة أو تستعمل الراديو الألماني المدمج (de-DE).'
    );
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopAllPlayback();
      return;
    }

    if (sourceMode === 'radio-tts') {
      setIsPlaying(true);
      setProgressPct(5);
      setStatusMessage(`🎙️ كيقرا النص الرسمي بالألمانية (${speed}x)...`);
      cancelTtsRef.current = speakGermanExamRadio(
        exam,
        speed,
        () => setIsPlaying(true),
        () => {
          setIsPlaying(false);
          setProgressPct(100);
          setStatusMessage('✅ سالا الأوديو الألماني — تقدر تعاود تسمعو فـ أي وقت');
        },
        (charIdx, totalLen) => {
          if (totalLen > 0) {
            setProgressPct(Math.min(99, Math.round((charIdx / totalLen) * 100)));
          }
        }
      );
      return;
    }

    // Native HTML5 <audio> playback WITHOUT crossOrigin attribute or fetch()
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const targetUrl =
      sourceMode === 'local-file' && localAudioMap[exam.id]
        ? localAudioMap[exam.id]
        : activeAudioUrl;

    if (audioEl.src !== targetUrl) {
      audioEl.src = targetUrl;
    }
    audioEl.playbackRate = speed;

    setStatusMessage(
      sourceMode === 'local-file'
        ? '🎧 خدام من الملف المحلي ديالك...'
        : `🎧 شغال مباشرة من سيرفر الأوديو الرسمي: ${selectedBucketFile}`
    );

    audioEl
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        handleAudioError();
      });
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
    if (isPlaying && sourceMode === 'radio-tts') {
      stopAllPlayback();
      setTimeout(() => {
        setIsPlaying(true);
        cancelTtsRef.current = speakGermanExamRadio(
          exam,
          newSpeed,
          () => setIsPlaying(true),
          () => setIsPlaying(false)
        );
      }, 80);
    }
  };

  const handleSeek = (deltaSec: number) => {
    if (audioRef.current && sourceMode !== 'radio-tts') {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime + deltaSec
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUploadLocalAudio(exam.id, file);
    setSourceMode('local-file');
    setStatusMessage(`✅ تم ربط الملف المحلي: ${file.name}`);
  };

  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-3.5 shadow-lg space-y-3">
      {/* Clean native <audio> element WITHOUT crossOrigin="anonymous" */}
      <audio
        ref={audioRef}
        src={activeAudioUrl}
        preload="metadata"
        onError={handleAudioError}
        onTimeUpdate={() => {
          const el = audioRef.current;
          if (el && el.duration > 0) {
            setProgressPct(Math.round((el.currentTime / el.duration) * 100));
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setProgressPct(100);
          setStatusMessage('✅ انتهى المقطع الصوتي الرسمي');
        }}
      />

      {/* Top Row: Source Switcher + Speed */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => {
              stopAllPlayback();
              setSourceMode('cloud-stream');
              const fileToUse = exam.audioSlug || selectedBucketFile || 'Lufthansa.mp3';
              setSelectedBucketFile(fileToUse);
              setActiveAudioUrl(`${OCI_BUCKET_BASE_URL}${fileToUse}`);
              setStatusMessage(`🎧 سيرفر الأوديو الرسمي (OCI): ${fileToUse}`);
            }}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
              sourceMode === 'cloud-stream'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>
              {exam.audioSlug ? `سيرفر الأوديو (${exam.audioSlug})` : 'سيرفر الأوديو (56 MP3s)'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              stopAllPlayback();
              setSourceMode('radio-tts');
              setStatusMessage('🎙️ راديو ألماني مدمج (de-DE) — خدام 100% مجاناً');
            }}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
              sourceMode === 'radio-tts'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>راديو ألماني (de-DE)</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
              sourceMode === 'local-file'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{localAudioMap[exam.id] ? 'ملف MP3 مربوط ✓' : 'رفع MP3/M4A'}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1" dir="ltr">
          {[0.75, 1.0, 1.25].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSpeedChange(s)}
              className={`rounded px-2 py-1 font-mono text-xs font-bold transition-all ${
                speed === s
                  ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* 56 Real OCI Bucket MP3s Dropdown Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 rounded-lg border border-blue-500/30 bg-slate-950/80 p-2.5">
        <label className="flex items-center gap-1.5 text-xs font-extrabold text-blue-300 shrink-0">
          <Headphones className="w-3.5 h-3.5" />
          <span>🎧 مكتبة الأوديو الحقيقية (56 MP3s):</span>
        </label>
        <select
          value={selectedBucketFile}
          onChange={(e) => handleBucketFileSelect(e.target.value)}
          dir="ltr"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 font-mono text-xs text-white focus:border-blue-400 focus:outline-none"
        >
          {REAL_OCI_BUCKET_MP3S.map((item) => (
            <option key={item.filename} value={item.filename}>
              {item.label} ({item.filename})
            </option>
          ))}
        </select>
      </div>

      {/* Main Play/Seek Controls + Progress Bar */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handlePlayToggle}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-white shadow transition-all ${
            isPlaying
              ? 'bg-rose-600 hover:bg-rose-500'
              : 'bg-emerald-600 hover:bg-emerald-500'
          }`}
          title={isPlaying ? 'إيقاف الأوديو' : 'تشغيل الأوديو'}
        >
          {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
        </button>

        {sourceMode !== 'radio-tts' && (
          <div className="flex items-center gap-1" dir="ltr">
            <button
              type="button"
              onClick={() => handleSeek(-5)}
              className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700"
              title="-5s"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleSeek(5)}
              className="rounded-lg bg-slate-800 p-2 text-slate-300 hover:bg-slate-700"
              title="+5s"
            >
              <FastForward className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
            <span className="truncate flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{statusMessage}</span>
            </span>
            <span className="font-mono text-emerald-400 shrink-0">{progressPct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Expandable German Radio Transcript Preview */}
      <details className="group">
        <summary className="cursor-pointer list-none text-xs font-semibold text-slate-400 hover:text-emerald-300 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>عرض نص الجمل الصحيحة بالألمانية (Hörtext-Zusammenfassung)</span>
        </summary>
        <div
          dir="ltr"
          className="mt-2 rounded-lg border border-slate-800 bg-slate-950/90 p-3 text-xs leading-relaxed text-slate-200 font-sans"
        >
          {exam.radioTranscript}
        </div>
      </details>
    </div>
  );
};
