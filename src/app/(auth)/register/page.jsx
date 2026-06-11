'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { toast.error(data.error); return; }
    toast.success('Account created! Please sign in.');
    router.push('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass">
        <div className="auth-header">
          <Link href="/" className="auth-logo">AURALIS</Link>
          <p className="auth-logo-sub">LUXURY HOTEL & RESORT</p>
          <h2 style={{ marginTop: 24 }}>Create Account</h2>
          <p className="subtitle">Join the Auralis experience</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Full Name</label>
            <div className="auth-input-wrap"><User size={16} className="auth-input-icon" /><input className="input" placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ paddingLeft: 40, width: '100%' }} /></div>
          </div>
          <div className="input-group">
            <label>Email</label>
            <div className="auth-input-wrap"><Mail size={16} className="auth-input-icon" /><input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={{ paddingLeft: 40, width: '100%' }} /></div>
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="auth-input-wrap"><Lock size={16} className="auth-input-icon" /><input className="input" type={showPw ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ paddingLeft: 40, paddingRight: 40, width: '100%' }} /><button type="button" className="auth-eye" onClick={() => setShowPw(!showPw)}>{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <div className="auth-input-wrap"><Lock size={16} className="auth-input-icon" /><input className="input" type="password" placeholder="••••••••" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} required style={{ paddingLeft: 40, width: '100%' }} /></div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }} disabled={loading}>
            {loading ? <span className="spinner spinner-sm" /> : <><UserPlus size={18} /> Create Account</>}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--cool-gray)', fontSize: '0.88rem' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--gold)', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
