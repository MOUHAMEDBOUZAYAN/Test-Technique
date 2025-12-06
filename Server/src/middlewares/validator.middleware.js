export const validateRegister = (req, res, next) => {
  const { nom, prenom, email, password } = req.body;
  const errors = [];

  if (!nom || nom.trim().length < 2 || nom.trim().length > 50) {
    errors.push('Nom must be between 2 and 50 characters');
  }

  if (!prenom || prenom.trim().length < 2 || prenom.trim().length > 50) {
    errors.push('Prenom must be between 2 and 50 characters');
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Valid email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

export const validateUpdate = (req, res, next) => {
  const { nom, prenom, email, password } = req.body;
  const errors = [];

  if (nom !== undefined) {
    if (nom.trim().length < 2 || nom.trim().length > 50) {
      errors.push('Nom must be between 2 and 50 characters');
    }
  }

  if (prenom !== undefined) {
    if (prenom.trim().length < 2 || prenom.trim().length > 50) {
      errors.push('Prenom must be between 2 and 50 characters');
    }
  }

  if (email !== undefined) {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.push('Valid email is required');
    }
  }

  if (password !== undefined) {
    if (password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

