const express = require('express')
const passport = require('passport')
const router = express.Router()

// Include google passport routes inside here

// Get route for auth google
router.get('/auth/google',
  passport.authenticate('google', { 
		scope: ['https://www.googleapis.com/auth/plus.login'] 
	}));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})
	
	module.exports = router