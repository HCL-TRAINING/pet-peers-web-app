import React, { useState } from 'react'
import LoginModal from '../../components/login-modal/loginModal';

export default function Login() {
    const [showModal, setShowModal] = useState(true);

    const showLoginModal = (value) => {
        setShowModal(value);
    }

    const submit = () => {

    }

  return (
    <div>
        <LoginModal show={showModal} onHide={() => showLoginModal(false)} onSuccess={() => submit()}></LoginModal>
    </div>
  )
}
