"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { showToast } from "@/lib/toast";

const roles = ["Владелец", "Редактор", "Просмотр"] as const;

type Role = (typeof roles)[number];

type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

const initialMembers: Member[] = [
  { id: "1", name: "Вы", email: "you@prostoii.ru", role: "Владелец" },
  { id: "2", name: "Анна Морозова", email: "anna@example.com", role: "Редактор" },
  { id: "3", name: "Илья Петров", email: "ilya@example.com", role: "Просмотр" },
];

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const inviteLink = "https://t.me/prostoii_bot?start=team";

  const handleRoleChange = (id: string, role: Role) => {
    setMembers((prev) => prev.map((member) => (member.id === id ? { ...member, role } : member)));
    showToast("Роль обновлена");
  };

  const handleCopy = () => {
    showToast("Ссылка скопирована");
  };

  const handleRemove = (id: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
    showToast("Участник удалён");
  };

  return (
    <div className="space-y-8">
      <header className="scroll-reveal space-y-2">
        <h1 className="text-3xl font-semibold text-text">Команда</h1>
        <p className="text-sm text-muted">Приглашайте коллег, настраивайте роли и делитесь избранными рецептами.</p>
      </header>

      <section className="scroll-reveal grid gap-4 md:grid-cols-[2fr_1fr]">
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text">Участники</h2>
              <p className="text-sm text-muted">Управляйте доступами и ролями.</p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl border border-neutral-200/70 px-4 py-2 text-sm font-semibold text-muted transition hover:text-text"
            >
              Скопировать инвайт
            </button>
          </div>
          <ul className="space-y-3">
            {members.map((member) => (
              <li key={member.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-200/70 bg-neutral-50/70 px-4 py-3">
                <div className="flex min-w-[180px] flex-col">
                  <span className="text-sm font-semibold text-text">{member.name}</span>
                  <span className="text-xs text-muted">{member.email}</span>
                </div>
                <select
                  value={member.role}
                  onChange={(event) => handleRoleChange(member.id, event.target.value as Role)}
                  className="rounded-xl border border-neutral-200/70 bg-white/90 px-3 py-2 text-sm font-semibold text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  aria-label={`Роль для ${member.name}`}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {member.id !== "1" && (
                  <button
                    type="button"
                    onClick={() => handleRemove(member.id)}
                    className="ml-auto inline-flex items-center rounded-xl border border-neutral-200/70 px-3 py-2 text-xs font-semibold text-muted transition hover:text-error"
                  >
                    Удалить
                  </button>
                )}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="flex flex-col gap-4 bg-neutral-50/80">
          <div>
            <h2 className="text-lg font-semibold text-text">Инвайт-ссылка</h2>
            <p className="mt-1 text-sm text-muted">Отправьте коллегам или поделитесь в чате. Лимит — 5 активных приглашений.</p>
          </div>
          <div className="rounded-2xl border border-dashed border-neutral-200/70 bg-white/95 px-4 py-3 text-sm text-text">
            {inviteLink}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Скопировать ссылку
          </button>
          <p className="text-xs text-muted">Можно отключить доступ в любой момент.</p>
        </Card>
      </section>
    </div>
  );
}
