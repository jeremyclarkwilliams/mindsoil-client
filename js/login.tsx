/* global React: true */

var LoginBox = React.createClass({
  handleLoginSubmit: function(loginInfo) {
    $('.message').text('Logging in...');
    $.ajax({
      url: this.props.url,
      type: 'POST',
      data: loginInfo,
      dataType: 'json',
      success: function(response) {
        setTimeout(function() {
          if (response.disabled) {
            $('.message').text('Account has been disabled.');
          } else if (response.valid) {
            window.location = window.location.href + '/' + response.user;
          } else {
            $('.message').text('Email or password incorrect.');
          }
        }, 2000);
      }.bind(this),
      error: function(xhr, status, err) {
        $('.message').text('An error has occurred. Please try again.');
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="container">
        <h2 className="hdr">Client Access</h2>
        <LoginForm onLoginSubmit={this.handleLoginSubmit} />
      </div>
    );
  }
});

var LoginForm = React.createClass({
  getInitialState: function() {
    return {email: '', password: ''};
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleValidity: function(field, value) {
    var validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    value = value.trim();
    if (!value || field === 'email' && !validEmail.test(value)) {
      $('[for=login-'+field+']').addClass('invalid').removeClass('valid');
    } else {
      $('[for=login-'+field+']').addClass('valid').removeClass('invalid')
    }
    if ($('.label.valid').length === $('.label').length) {
      $('#btn-login').prop('disabled', false);
    } else {
      $('#btn-login').prop('disabled', true);
    }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    this.props.onLoginSubmit({email: email, password: password});
  },
  render: function() {
    return (
      <form className="form" onSubmit={this.handleSubmit} novalidate>
        <label htmlFor="login-email" className="label">Email</label>
        <input
          type="email"
          id="login-email"
          className="input"
          name="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          onKeyUp={this.handleValidity.bind(this, 'email', this.state.email)} />
        <label htmlFor="login-password" className="label">Password</label>
        <input
          type="password"
          id="login-password"
          className="input"
          name="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          onKeyUp={this.handleValidity.bind(this, 'password', this.state.password)} />
        <input
          type="submit"
          name="submit"
          id="btn-login"
          className="btn-login"
          value="Login"
          disabled />
        <p className="message"></p>
      </form>
    );
  }
});

ReactDOM.render(
  <LoginBox url="client/login.php" />,
  document.getElementById('section-client')
);
