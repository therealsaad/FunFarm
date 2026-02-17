const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "Verification email sent"
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const tokens = await authService.login(req.body);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.json({
      success: true,
      accessToken: tokens.accessToken
    });
  } catch (err) {
    next(err);
  }
};
