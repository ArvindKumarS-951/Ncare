
import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
}

const VoiceButton = ({ onTranscript }: VoiceButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const base64Audio = await blobToBase64(audioBlob);
        
        try {
          const response = await fetch('https://oyyvnsfghvgjuorslayk.supabase.co/functions/v1/voice-to-text', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ audio: base64Audio }),
          });

          if (!response.ok) throw new Error('Failed to transcribe audio');
          
          const { text } = await response.json();
          onTranscript(text);
        } catch (error) {
          toast.error('Failed to transcribe audio. Please try again.');
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      toast.error('Please enable microphone access to use voice input.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <Button
      size="icon"
      variant={isRecording ? "destructive" : "outline"}
      onClick={isRecording ? stopRecording : startRecording}
    >
      {isRecording ? (
        <MicOff className="h-5 w-5" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </Button>
  );
};

export default VoiceButton;
