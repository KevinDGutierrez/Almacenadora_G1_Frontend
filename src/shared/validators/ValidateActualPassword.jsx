export const validateActualPassword = async (user, actualPassword = '', newPassword = '') => {
    if (!actualPassword) throw new Error('You must provide your current password');
    if (!user?.password) throw new Error('Password hash not found in user data');
  
    const isMatch = await verify(user.password, actualPassword);
    if (!isMatch) throw new Error('Current password is incorrect');
  
    return newPassword ? await hash(newPassword) : null;
  };
  
  const hash = async (value) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };
  
  const verify = async (hashedValue, plainValue) => {
    const plainHash = await hash(plainValue);
    return plainHash === hashedValue;
  };
  
  export const validateActualPasswordMessage = 'La contraseña actual no es correcta';