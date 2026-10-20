export type ContactFields = { name: string; email: string; message: string; 'bot-field'?: string };

export function encodeContact(fields: ContactFields) {
  return new URLSearchParams({
    'form-name': 'contact',
    name: fields.name.trim(),
    email: fields.email.trim(),
    message: fields.message.trim(),
    'bot-field': fields['bot-field'] || '',
  }).toString();
}

export async function submitContact(
  fields: ContactFields,
  request: typeof fetch = fetch,
  signal?: AbortSignal,
) {
  const response = await request('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeContact(fields),
    signal,
  });
  if (!response.ok) throw new Error('The server did not accept the submission.');
}

export function emailDraft(fields: ContactFields, recipient: string) {
  return (
    'mailto:' +
    recipient +
    '?subject=' +
    encodeURIComponent('Portfolio inquiry from ' + fields.name.trim()) +
    '&body=' +
    encodeURIComponent(
      fields.message.trim() +
        '\n\nFrom: ' +
        fields.name.trim() +
        '\nReply to: ' +
        fields.email.trim(),
    )
  );
}
