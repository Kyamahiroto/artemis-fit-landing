import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'artemis_lead_email';
const STORAGE_NAME_KEY = 'artemis_lead_name';
const EDGE_FUNCTION_URL = 'https://vgraihcqjyfbsnmilsxt.supabase.co/functions/v1/capture-lead';

interface CapturePayload {
  email: string;
  name?: string;
  sourceTool: string;
  toolResults?: Record<string, unknown>;
}

interface UseLeadCaptureReturn {
  isUnlocked: boolean;
  isLoading: boolean;
  error: string | null;
  capturedEmail: string | null;
  capturedName: string | null;
  captureLead: (payload: CapturePayload) => Promise<void>;
}

export const useLeadCapture = (): UseLeadCaptureReturn => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedEmail, setCapturedEmail] = useState<string | null>(null);
  const [capturedName, setCapturedName] = useState<string | null>(null);

  // Check localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem(STORAGE_KEY);
    const storedName = localStorage.getItem(STORAGE_NAME_KEY);
    if (storedEmail) {
      setIsUnlocked(true);
      setCapturedEmail(storedEmail);
      if (storedName) setCapturedName(storedName);
    }
  }, []);

  const captureLead = useCallback(async (payload: CapturePayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: payload.email,
          name: payload.name || null,
          source_tool: payload.sourceTool,
          tool_results: payload.toolResults || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao processar sua solicitação');
      }

      // Success: save to localStorage and unlock
      localStorage.setItem(STORAGE_KEY, payload.email);
      if (payload.name) localStorage.setItem(STORAGE_NAME_KEY, payload.name);
      setCapturedEmail(payload.email);
      setCapturedName(payload.name || null);
      setIsUnlocked(true);
    } catch (err) {
      // Even if API fails, still unlock for better UX
      // The lead data is the priority but we don't punish the user
      console.error('Lead capture error:', err);
      localStorage.setItem(STORAGE_KEY, payload.email);
      if (payload.name) localStorage.setItem(STORAGE_NAME_KEY, payload.name);
      setCapturedEmail(payload.email);
      setCapturedName(payload.name || null);
      setIsUnlocked(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isUnlocked, isLoading, error, capturedEmail, capturedName, captureLead };
};
