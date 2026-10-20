import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { encodeContact, emailDraft, submitContact } from '../src/lib/contact.ts';

const fields = {
  name: ' Test Sender ',
  email: 'test@example.com',
  message: 'Hello & welcome = a test message.',
};
test('Netlify POST field names match the static detection form', () => {
  const body = new URLSearchParams(encodeContact(fields));
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  for (const key of body.keys()) assert.ok(html.includes(`name="${key}"`), key);
  assert.equal(body.get('form-name'), 'contact');
  assert.equal(body.get('name'), 'Test Sender');
  assert.equal(body.get('message'), fields.message);
});
test('submission uses an encoded POST and accepts a successful response', async () => {
  let called = false;
  const request = async (url: string | URL | Request, init?: RequestInit) => {
    called = true;
    assert.equal(url, '/');
    assert.equal(init?.method, 'POST');
    assert.equal(
      new Headers(init?.headers).get('Content-Type'),
      'application/x-www-form-urlencoded',
    );
    assert.equal(new URLSearchParams(String(init?.body)).get('email'), fields.email);
    return new Response('', { status: 200 });
  };
  await submitContact(fields, request);
  assert.ok(called);
});
test('failed server or network responses never resolve as success', async () => {
  await assert.rejects(submitContact(fields, async () => new Response('', { status: 404 })));
  await assert.rejects(
    submitContact(fields, async () => {
      throw new Error('Network unavailable');
    }),
  );
});
test('email fallback contains the supplied recipient and escaped message', () => {
  const draft = new URL(emailDraft(fields, 'sayeedssaadman272491@gmail.com'));
  assert.equal(draft.pathname, 'sayeedssaadman272491@gmail.com');
  assert.equal(draft.searchParams.get('subject'), 'Portfolio inquiry from Test Sender');
  assert.ok(draft.searchParams.get('body')?.includes(fields.message));
});
