'use client';
import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', { ...form, redirect: false });
    setLoading(false);
    if (res?.error) { toast.error(res.error); }
    else { toast.success('Welcome back!'); router.push(callbackUrl); router.refresh(); }
  };

  return (
    <div className="auth-card glass">
      <div className="auth-header">
        <Link href="/" className="auth-logo">AURALIS</Link>
        <p className="auth-logo-sub">LUXURY HOTEL & RESORT</p>
        <h2 style={{ marginTop: 24 }}>Welcome Back</h2>
        <p className="subtitle">Sign in to your account</p>
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label>Email Address</label>
          <div className="auth-input-wrap">
            <Mail size={16} className="auth-input-icon" />
            <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={{ paddingLeft: 40 }} />
          </div>
        </div>
        <div className="input-group">
          <label>Password</label>
          <div className="auth-input-wrap">
            <Lock size={16} className="auth-input-icon" />
            <input className="input" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ paddingLeft: 40, paddingRight: 40 }} />
            <button type="button" className="auth-eye" onClick={() => setShowPw(!showPw)}>{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }} disabled={loading}>
          {loading ? <span className="spinner spinner-sm" /> : <><LogIn size={18} /> Sign In</>}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--cool-gray)', fontSize: '0.88rem' }}>
        Don&apos;t have an account? <Link href="/register" style={{ color: 'var(--gold)', fontWeight: 600 }}>Register</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="auth-page">
      <Suspense fallback={<div className="spinner" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
