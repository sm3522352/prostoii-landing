import { useState } from 'react';
import Section from '@/components/Section';
import { goal } from '@/lib/metrics';
import { useEffect } from 'react';

export default function CancelPage() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    goal('view_cancel');
  }, []);
  const contact = process.env.NEXT_PUBLIC_CONTACT_EMAIL || '';
  const mailto = `mailto:${contact}?subject=Отмена%20подписки&body=Email:%20${encodeURIComponent(email)}`;
  return (
    <Section className="pt-12 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Отмена подписки</h1>
      <p className="text-text-secondary text-sm mb-6 text-center">
        Введите адрес электронной почты, на который оформлена подписка. Мы свяжемся с вами для подтверждения отмены. Также
        отмену можно сделать из личного кабинета.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = mailto;
        }}
        className="space-y-4"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Ваш e-mail"
          className="w-full px-4 py-3 rounded-lg bg-panel border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          className="w-full px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover"
        >
          Отправить запрос
        </button>
      </form>
    </Section>
  );
}