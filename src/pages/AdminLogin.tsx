import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/useAuth';

const AdminLogin = () => {
  const { user, isAdmin, isLoading, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && user && isAdmin) return <Navigate to="/admin" replace />;

  const displayedError = error ?? (user && !isAdmin ? 'This account does not have administrator access.' : null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await signIn(email, password);
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'Unable to sign in.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', maxWidth: '520px' }}>
      <h1>Admin Login</h1>
      <p style={{ marginBottom: '2rem' }}>Sign in with your administrator account to manage products.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label htmlFor="admin-email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
          <input id="admin-email" type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
        </div>
        <div>
          <label htmlFor="admin-password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
          <input id="admin-password" type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
        </div>
        {displayedError && <p role="alert" style={{ color: 'var(--error-color, #b42318)', margin: 0 }}>{displayedError}</p>}
        <Button type="submit" size="lg" disabled={isSubmitting || isLoading}>{isSubmitting ? 'Signing in…' : 'Sign in'}</Button>
      </form>
    </div>
  );
};

export default AdminLogin;
