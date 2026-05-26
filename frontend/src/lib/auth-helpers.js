export async function fetchTutorProfile(user, token) {
  const userId = user?._id || user?.id;
  if (!userId) {
    console.warn('Missing tutor ID for profile fetch');
    return null;
  }

  const res = await fetch(`http://localhost:5000/api/tutors/profile/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    console.warn('Profile lookup failed', res.status);
    return null;
  }

  const profile = await res.json();
  const hasTutorDoc = profile?.status !== undefined || profile?.profileComplete !== undefined;
  return {
    ...profile,
    profileComplete: Boolean(profile?.profileComplete) || hasTutorDoc
  };
}

export async function verifyTutorProfileAndDecide(user, token, navigate) {
  try {
    const profile = await fetchTutorProfile(user, token);
    if (!profile) {
      navigate('/register-tutor', { replace: true });
      return null;
    }

    localStorage.setItem('tutor', JSON.stringify(profile));

    const isComplete = Boolean(profile.profileComplete) || Boolean(profile.subject) || Boolean(profile.hourlyRate);

    if (!isComplete) {
      navigate('/register-tutor', { replace: true });
      return profile;
    }

    if (profile.status === 'rejected') {
      alert('Your account has been rejected. Please contact support.');
    }

    navigate('/tutor-dashboard', { replace: true });
    return profile;
  } catch (err) {
    console.error('Error verifying tutor profile:', err);
    navigate('/register-tutor', { replace: true });
    return null;
  }
}
