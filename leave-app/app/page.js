'use client';
import { useEffect, useState } from 'react';

const box = { maxWidth: 720, margin: '40px auto', padding: 24 };
const card = { background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: 24 };
const input = { width: '100%', padding: 10, marginTop: 6, marginBottom: 14, border: '1px solid #ddd', borderRadius: 8, boxSizing: 'border-box' };
const btn = { padding: '10px 18px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 15 };

export default function Home() {
  const [form, setForm] = useState({ employee: '', type: 'Annual', start_date: '', end_date: '', reason: '' });
  const [leaves, setLeaves] = useState([]);
  const [msg, setMsg] = useState('');

  const load = async () => {
    const res = await fetch('/api/leaves');
    setLeaves(await res.json());
  };
  useEffect(() => { load(); }, []);

  const submit = async () => {
    setMsg('');
    const res = await fetch('/api/leaves', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ employee: '', type: 'Annual', start_date: '', end_date: '', reason: '' });
      setMsg('Request submitted.');
      load();
    } else {
      const d = await res.json();
      setMsg(d.error || 'Something went wrong.');
    }
  };

  const badge = (s) => ({
    pending: { background: '#fff3cd', color: '#856404' },
    approved: { background: '#d4edda', color: '#155724' },
    rejected: { background: '#f8d7da', color: '#721c24' },
  }[s] || {});

  return (
    <div style={box}>
      <h1>Leave Requests</h1>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>New Request</h2>
        <label>Name</label>
        <input style={input} value={form.employee} onChange={e => setForm({ ...form, employee: e.target.value })} />
        <label>Type</label>
        <select style={input} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          <option>Annual</option><option>Sick</option><option>Casual</option><option>Unpaid</option>
        </select>
        <label>Start Date</label>
        <input type="date" style={input} value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} />
        <label>End Date</label>
        <input type="date" style={input} value={form.end_date} onChange={e => setForm({ ...form, end_date: e.target.value })} />
        <label>Reason</label>
        <textarea style={{ ...input, minHeight: 60 }} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} />
        <button style={btn} onClick={submit}>Submit</button>
        {msg && <p style={{ color: '#0070f3' }}>{msg}</p>}
      </div>

      <div style={card}>
        <h2 style={{ marginTop: 0 }}>All Requests</h2>
        {leaves.length === 0 && <p>No requests yet.</p>}
        {leaves.map(l => (
          <div key={l.id} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
            <strong>{l.employee}</strong> — {l.type}
            <span style={{ ...badge(l.status), padding: '2px 10px', borderRadius: 12, fontSize: 12, marginLeft: 8 }}>{l.status}</span>
            <div style={{ fontSize: 14, color: '#666' }}>{l.start_date?.slice(0,10)} → {l.end_date?.slice(0,10)}</div>
            {l.reason && <div style={{ fontSize: 14, marginTop: 4 }}>{l.reason}</div>}
            <div style={{ marginTop: 8 }}>
              <button style={{ ...btn, background: '#28a745', padding: '5px 12px', marginRight: 8 }}
                onClick={async () => { await fetch('/api/leaves', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: l.id, status: 'approved' }) }); load(); }}>Approve</button>
              <button style={{ ...btn, background: '#dc3545', padding: '5px 12px' }}
                onClick={async () => { await fetch('/api/leaves', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: l.id, status: 'rejected' }) }); load(); }}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
