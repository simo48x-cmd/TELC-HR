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
} from 'lucide-react';
import { HoerenExam } from '../data/types';
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
  const [sourceMode, setSourceMode] = useState<AudioSourceMode>('radio-tts');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const [progressPct, setProgressPct] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>(
    'راديو ألماني مدمج (de-DE) — خدام 100% بلا أنترنت وبلا API'
  );

  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const cancelTtsRef = useRef<(() => void) | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    stopAllPlayback();
    setProgressPct(0);
    if (localAudioMap[exam.id]) {
      setSourceMode('local-file');
      setStatusMessage('ملف أوديو محلي جاهز للقراءة المباشرة');
    } else {
      setStatusMessage('راديو ألماني مدمج (de-DE) — خدام 100% مجاناً');
    }
    return () => {
      stopAllPlayback();
    };
  }, [exam.id]);

  const stopAllPlayback = () => {
    if (cancelTtsRef.current) {
      cancelTtsRef.current();
      cancelTtsRef.current = null;
    }
    stopGermanExamRadio();
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
      htmlAudioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
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

    // HTML5 <audio> playback for Cloud Stream or Local File
    const audioEl = htmlAudioRef.current;
    if (!audioEl) return;

    const targetSrc =
      sourceMode === 'local-file' && localAudioMap[exam.id]
        ? localAudioMap[exam.id]
        : exam.audioUrlPrimary;

    audioEl.src = targetSrc;
    audioEl.playbackRate = speed;
    setStatusMessage(
      sourceMode === 'local-file'
        ? '🎧 خدام من الملف المحلي ديالك...'
        : '🌐 جاري الاتصال بـ telccfree.com / sahlab2.online...'
    );

    audioEl
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Automatic fallback to built-in German Radio Synthesizer if external stream is offline/CORS-blocked
        setSourceMode('radio-tts');
        setStatusMessage(
          '⚡ السيرفر الخارجي محجوب (CORS) — تم التحويل تلقائياً للراديو الألماني المدمج (de-DE)!'
        );
        setIsPlaying(true);
        cancelTtsRef.current = speakGermanExamRadio(
          exam,
          speed,
          () => setIsPlaying(true),
          () => {
            setIsPlaying(false);
            setProgressPct(100);
          },
          (charIdx, totalLen) => {
            if (totalLen > 0) {
              setProgressPct(Math.min(99, Math.round((charIdx / totalLen) * 100)));
            }
          }
        );
      });
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (htmlAudioRef.current) {
      htmlAudioRef.current.playbackRate = newSpeed;
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
    if (htmlAudioRef.current && sourceMode !== 'radio-tts') {
      htmlAudioRef.current.currentTime = Math.max(
        0,
        htmlAudioRef.current.currentTime + deltaSec
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUploadLocalAudio(exam.id, file);
    setSourceMode('local-file');
    setStatusMessage(`✅ تم ربط الملف: ${file.name}`);
  };

  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-3.5 shadow-lg">
      <audio
        ref={htmlAudioRef}
        onTimeUpdate={() => {
          const el = htmlAudioRef.current;
          if (el && el.duration > 0) {
            setProgressPct(Math.round((el.currentTime / el.duration) * 100));
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setProgressPct(100);
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
        {/* Source Mode Switcher */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => {
              stopAllPlayback();
              setSourceMode('radio-tts');
              setStatusMessage('راديو ألماني مدمج (de-DE) — خدام 100% مجاناً');
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
            onClick={() => {
              stopAllPlayback();
              setSourceMode('cloud-stream');
              setStatusMessage('رابط مباشر: telccfree.com / sahlab2.online');
            }}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
              sourceMode === 'cloud-stream'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>سيرفر الأوديو</span>
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

      {/* Main Controls + Progress Bar */}
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={handlePlayToggle}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-white shadow transition-all ${
            isPlaying
              ? 'bg-rose-600 hover:bg-rose-500'
              : 'bg-emerald-600 hover:bg-emerald-500'
          }`}
          title={isPlaying ? 'إيقاف الأوديو' : 'تشغيل الأوديو الألماني'}
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
      <details className="mt-2.5 group">
        <summary className="cursor-pointer list-none text-xs font-semibold text-slate-400 hover:text-emerald-300 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>عرض نص الراديو الألماني الكامل (Hörtext-Transkript)</span>
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
