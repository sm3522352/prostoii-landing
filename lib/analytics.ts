"use client";

import { MutableRefObject } from "react";

type UserProps = {
  plan?: string;
  is_new?: boolean;
  locale?: string;
  device?: string;
  ab_variant?: string;
};

type AnalyticsEvent =
  | "hero_cta_clicked"
  | "examples_clicked"
  | "recipe_card_clicked"
  | "search_used"
  | "onboarding_started"
  | "first_result_generated"
  | "result_copied"
  | "result_saved"
  | "paywall_viewed"
  | "plan_selected"
  | "faq_opened"
  | "review_submitted"
  | "login_success"
  | "onboarding_step"
  | "recipe_launch"
  | "chat_send"
  | "file_upload"
  | "plan_upgrade"
  | "privacy_change";

const userProps: UserProps = {};

export function setUserProps(props: UserProps) {
  Object.assign(userProps, props);
  console.info("[analytics:user_props]", userProps);
}

export function getDeviceType() {
  if (typeof window === "undefined") return "desktop";
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

export function trackEvent(event: AnalyticsEvent, props: Record<string, unknown> = {}) {
  const payload = { event, props: { ...props, timestamp: Date.now() }, user: userProps };
  console.info("[analytics:event]", payload);
}

export function trackTimeToValue(
  startedAtRef: MutableRefObject<number | null>,
  eventName: AnalyticsEvent,
  extra: Record<string, unknown> = {}
) {
  const startedAt = startedAtRef.current;
  if (!startedAt) return;
  const delta = Math.round((performance.now() - startedAt) / 1000);
  trackEvent(eventName, { ...extra, time_to_value_sec: delta });
  startedAtRef.current = null;
}
