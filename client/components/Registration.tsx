// import { usePostUser, useGetUserByAuth0Id } from '../hooks/useUsers.ts'
// import { useNavigate } from 'react-router'
// import { useState, useEffect } from 'react'
// import { IfAuthenticated, IfNotAuthenticated } from './Auth0.tsx'
// import LoadingSpinner from './LoadingSpinner.tsx'

// function Registraton() {
//   const postUser = usePostUser()
//   const { data: userData, isLoading: userLoading } = useGetUserByAuth0Id()
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!userLoading && userData) {
//       navigate('/')
//     }
//   }, [userData, userLoading, navigate])

//   const [form, setForm] = useState({
//     name: '',
//     role: '',
//     file: null as File | null,
//   })

//   if (userLoading) {
//     return <LoadingSpinner />
//   }

//   const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
//     evt.preventDefault()
//     setForm({
//       ...form,
//       [evt.target.name]: evt.target.value,
//     })
//   }

//   function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
//     if (evt.target.files && evt.target.files[0]) {
//       setForm({ ...form, file: evt.target.files[0] })
//     }
//   }
//   const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
//     // const token = await getAccessTokenSilently()
//     evt.preventDefault()

//     // const newUser = {
//     //   name: form.name,
//     //   role: form.role,
//     //   profile_photo: form.file
//     // }
//     const formData = new FormData()
//     formData.append('name', form.name)
//     formData.append('role', form.role)

//     if (form.file) {
//       formData.append('profile_photo', form.file)
//     }

//     try {
//       await postUser.mutateAsync(formData)
//       navigate('/')
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   return (
//     <div className="registration">
//       <video autoPlay muted loop className="background-video">
//         <source src="/videos/etnz-sunshine.mp4" type="video/mp4" />
//       </video>
//       <div className="content">
//         <IfAuthenticated>
//           <h1>Create your ETNZ race ❗hub account❗</h1>
//           <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <div>
//               <label htmlFor="name">What is your name?</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 placeholder="..Matthew"
//               />
//             </div>
//             <div>
//               <label htmlFor="role">What is your role?</label>
//               <input
//                 type="text"
//                 id="role"
//                 name="role"
//                 value={form.role}
//                 onChange={handleChange}
//                 placeholder="..Captain"
//               />
//             </div>

//             <div>
//               <label htmlFor="file">Upload a file..</label>
//               <input
//                 type="file"
//                 id="profile_photo"
//                 name="profile_photo"
//                 onChange={handleFileChange}
//               />
//             </div>
//             <button type="submit" disabled={!form.name}>
//               Create Account
//             </button>
//           </form>
//         </IfAuthenticated>
//         <IfNotAuthenticated>
//           <div>
//             <h1>❗Go back and authenticate yourself❗</h1>
//           </div>
//         </IfNotAuthenticated>
//       </div>
//     </div>
//   )
// }

// export default Registraton

import { usePostUser, useGetUserByAuth0Id } from '../hooks/useUsers.ts'
import { useNavigate } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import { IfAuthenticated, IfNotAuthenticated } from './Auth0.tsx'
import LoadingSpinner from './LoadingSpinner.tsx'

function Registration() {
  const postUser = usePostUser()
  const { data: userData, isLoading: userLoading } = useGetUserByAuth0Id()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!userLoading && userData) {
      navigate('/')
    }
  }, [userData, userLoading, navigate])

  const [form, setForm] = useState({
    name: '',
    role: '',
    file: null as File | null,
  })
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (userLoading) return <LoadingSpinner />

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [evt.target.name]: evt.target.value })
  }

  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const file = evt.target.files?.[0]
    if (file) {
      setForm({ ...form, file })
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('role', form.role)
    if (form.file) formData.append('profile_photo', form.file)
    try {
      await postUser.mutateAsync(formData)
      navigate('/')
    } catch (err) {
      console.error(err)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap');

        .reg-root {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Barlow', sans-serif;
          overflow: hidden;
        }

        .reg-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        /* Dark overlay to ensure readability */
      .reg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 8, 22, 0.25) 0%,
    rgba(0, 31, 63, 0.2) 60%,
    rgba(0, 8, 22, 0.3) 100%
  );
  z-index: 1;
}

        .reg-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 480px;
          padding: 1.5rem;
        }

        /* Card */
        .reg-card {
          background: rgba(0, 8, 30, 0.78);
          border: 1px solid rgba(0, 116, 217, 0.28);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(228, 0, 43, 0.12),
            0 24px 64px rgba(0, 0, 0, 0.6),
            0 4px 24px rgba(0, 116, 217, 0.12);
          overflow: hidden;
        }

        /* Top accent bar */
        .reg-card-accent {
          height: 3px;
          background: linear-gradient(90deg, #e4002b 0%, #0074d9 55%, rgba(0,116,217,0) 100%);
        }

        .reg-card-body {
          padding: 2.25rem 2rem 2rem;
        }

        /* Header */
        .reg-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .reg-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          color: #0074d9;
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-bottom: 0.55rem;
        }

        .reg-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.85rem;
          font-weight: 900;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          line-height: 1.1;
          margin-bottom: 0.4rem;
        }

        .reg-title span {
          color: #e4002b;
        }

        .reg-subtitle {
          font-size: 0.82rem;
          color: rgba(192, 192, 192, 0.65);
          font-weight: 400;
          letter-spacing: 0.2px;
        }

        /* Divider */
        .reg-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
        }
        .reg-divider::before,
        .reg-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(0, 116, 217, 0.2);
        }
        .reg-divider-dot {
          width: 5px;
          height: 5px;
          background: #e4002b;
          border-radius: 50%;
        }

        /* Avatar upload */
        .reg-avatar-upload {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.75rem;
          gap: 0.65rem;
        }

        .reg-avatar-ring {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, #e4002b, #0074d9);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .reg-avatar-ring:hover {
          transform: scale(1.04);
          box-shadow: 0 0 20px rgba(228, 0, 43, 0.35);
        }

        .reg-avatar-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(0, 31, 63, 0.9);
          border: 2px solid rgba(0, 8, 22, 0.8);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reg-avatar-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .reg-avatar-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
        }

        .reg-avatar-icon {
          width: 28px;
          height: 28px;
          color: rgba(192, 192, 192, 0.45);
        }

        .reg-avatar-hint {
          font-size: 0.6rem;
          color: rgba(192, 192, 192, 0.4);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-align: center;
        }

        .reg-avatar-label {
          font-size: 0.72rem;
          color: #0074d9;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .reg-avatar-label:hover {
          color: #40a9ff;
        }

        /* Form fields */
        .reg-field {
          margin-bottom: 1.1rem;
        }

        .reg-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(192, 192, 192, 0.75);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 0.45rem;
        }

        .reg-label-required {
          color: #e4002b;
          font-size: 0.75rem;
          line-height: 1;
        }

        .reg-input-wrapper {
          position: relative;
        }

        .reg-input-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: rgba(0, 116, 217, 0.55);
          pointer-events: none;
          transition: color 0.2s;
        }

        .reg-input {
          width: 100%;
          padding: 0.7rem 0.9rem 0.7rem 2.5rem;
          background: rgba(0, 116, 217, 0.25);
          border: 1px solid rgba(0, 116, 217);
          border-radius: 8px;
          color: #ffffff;
          font-family: 'Barlow', sans-serif;
          font-size: 0.92rem;
          font-weight: 500;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          outline: none;
        }

        .reg-input::placeholder {
          color: rgba(192, 192, 192, 0.28);
          font-weight: 400;
        }

        .reg-input:focus {
          border-color: #0074d9;
          background: rgba(0, 116, 217, 0.12);
          box-shadow: 0 0 0 3px rgba(0, 116, 217, 0.12);
        }

        .reg-input:focus + .reg-input-icon,
        .reg-input-wrapper:focus-within .reg-input-icon {
          color: #0074d9;
        }

        /* Submit button */
        .reg-submit {
          width: 100%;
          margin-top: 0.75rem;
          padding: 0.85rem 1rem;
          background: linear-gradient(135deg, #c4001f 0%, #e4002b 100%);
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 16px rgba(228, 0, 43, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
        }

        .reg-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
        }

        .reg-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(228, 0, 43, 0.5);
        }

        .reg-submit:active:not(:disabled) {
          transform: scale(0.98);
        }

        .reg-submit:disabled {
          opacity: 0.42;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .reg-submit-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: reg-spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes reg-spin {
          to { transform: rotate(360deg); }
        }

        /* Footer note */
        .reg-footer-note {
          margin-top: 1.25rem;
          text-align: center;
          font-size: 0.7rem;
          color: rgba(245, 245, 245, 0.8);
          line-height: 1.5;
        }

        /* Unauthenticated state */
        .reg-unauth {
          padding: 2.5rem 2rem;
          text-align: center;
        }

        .reg-unauth-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .reg-unauth-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .reg-unauth-subtitle {
          font-size: 0.82rem;
          color: rgba(192, 192, 192, 0.55);
        }
      `}</style>

      <div className="reg-root">
        <video autoPlay muted loop className="reg-bg-video">
          <source src="/videos/etnz-sunshine.mp4" type="video/mp4" />
        </video>
        <div className="reg-overlay" />

        <div className="reg-container">
          <div className="reg-card">
            <div className="reg-card-accent" />
            <div className="reg-card-body">
              <IfAuthenticated>
                {/* Header */}
                <div className="reg-header">
                  <p className="reg-eyebrow">Emirates Team New Zealand</p>
                  <h1 className="reg-title">
                    Race<span>Hub</span> Access
                  </h1>
                  <p className="reg-subtitle">
                    Set up your crew profile to get started
                  </p>
                </div>

                <div className="reg-divider">
                  <span className="reg-divider-dot" />
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  {/* Avatar upload */}
                  <div className="reg-avatar-upload">
                    <div
                      className="reg-avatar-ring"
                      onClick={() => fileInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && fileInputRef.current?.click()
                      }
                    >
                      <div className="reg-avatar-inner">
                        {preview ? (
                          <img src={preview} alt="Profile preview" />
                        ) : (
                          <div className="reg-avatar-placeholder">
                            <svg
                              className="reg-avatar-icon"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <span className="reg-avatar-hint">Photo</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <span
                      className="reg-avatar-label"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {preview ? 'Change photo' : 'Upload profile photo'}
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="profile_photo"
                      name="profile_photo"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </div>

                  {/* Name */}
                  <div className="reg-field">
                    <label className="reg-label" htmlFor="name">
                      Full name
                      <span className="reg-label-required">*</span>
                    </label>
                    <div className="reg-input-wrapper">
                      <input
                        className="reg-input"
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Peter Burling"
                        autoComplete="name"
                        required
                      />
                      <svg
                        className="reg-input-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="reg-field">
                    <label className="reg-label" htmlFor="role">
                      Crew role
                    </label>
                    <div className="reg-input-wrapper">
                      <input
                        className="reg-input"
                        type="text"
                        id="role"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        placeholder="e.g. Helmsman, Tactician, Engineer"
                        autoComplete="organization-title"
                      />
                      <svg
                        className="reg-input-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="reg-submit"
                    disabled={!form.name || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="reg-submit-spinner" />
                        Creating account…
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>

                <p className="reg-footer-note">
                  Your profile is only visible to authenticated ETNZ crew
                  members.
                </p>
              </IfAuthenticated>

              <IfNotAuthenticated>
                <div className="reg-unauth">
                  <div className="reg-unauth-icon">🔒</div>
                  <h2 className="reg-unauth-title">Authentication Required</h2>
                  <p className="reg-unauth-subtitle">
                    Please sign in before creating your crew profile.
                  </p>
                </div>
              </IfNotAuthenticated>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Registration
