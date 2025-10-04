import { useEffect, useState } from 'react';

/**
 * CookieConsent shows a banner informing the user about cookies. It
 * persists the acknowledgement in localStorage to avoid repeated
 * prompts. In production you might enhance this to respect cookie
 * preferences.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent');
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-panel border-t border-border p-4 flex flex-col sm:flex-row items-center justify-between text-sm text-text-secondary">
      <span>Мы используем куки, чтобы улучшить работу сайта. Продолжая пользоваться сайтом, вы соглашаетесь с этим.</span>
      <button
        className="mt-2 sm:mt-0 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover"
        onClick={accept}
      >
        Понятно
      </button>
    </div>
  );
}