import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LoginModal: React.FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(email, password);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="auth-overlay"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="auth-modal"
            >
                <h2 className="auth-title">{t('auth.login.title')}</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="email"
                        placeholder={t('auth.login.email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input auth-input"
                    />
                    <input
                        type="password"
                        placeholder={t('auth.login.password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input auth-input"
                    />
                    <button type="submit" className="btn btn-primary auth-submit">
                        {t('auth.login.submit')}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default LoginModal;