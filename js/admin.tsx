$(document).ready(function () {


});

/* global React: true */

/* --------------
    LOGIN
-------------- */

var LoginBox = React.createClass({
  handleLoginSubmit: function(loginInfo) {
    $('.message').text('Logging in...');
    $.ajax({
      url: this.props.url,
      type: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: loginInfo,
      success: function(response) {
        setTimeout(function() {
          if (response) {
            window.location = window.location.href + '/panel';
          } else {
            $('.message').text('User name or password incorrect.');
          }
        }, 2000);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="container">
        <h2 className="hdr">Admin Login</h2>
        <LoginForm onLoginSubmit={this.handleLoginSubmit} />
      </div>
    );
  }
});

var LoginForm = React.createClass({
  getInitialState: function() {
    return {user: '', password: ''};
  },
  handleUserChange: function(e) {
    this.setState({user: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleValidity: function(field, value) {
    value = value.trim();
    if (!value) {
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
    var user = this.state.user.trim();
    var password = this.state.password.trim();
    this.props.onLoginSubmit({user: user, password: password});
  },
  render: function() {
    return (
      <form className="form" onSubmit={this.handleSubmit} novalidate>
        <label htmlFor="login-user" className="label">User Name</label>
        <input
          type="text"
          id="login-user"
          className="input"
          name="user"
          value={this.state.user}
          onChange={this.handleUserChange}
          onKeyUp={this.handleValidity.bind(this, 'user', this.state.user)} />
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

if (null !== document.getElementById('section-admin')) {
  ReactDOM.render(
    <LoginBox url="admin/login.php" />,
    document.getElementById('section-admin')
  );
}


/* --------------
    CLIENTS
-------------- */

var ClientBox = React.createClass({
  loadClients: function() {
    $.ajax({
      url: 'get-clients.php',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadClients();
    setInterval(this.loadClients, this.props.pollInterval);
  },
  handleAddSubmit: function(clientInfo) {
    var clients = this.state.data;
    var newClients = clients.concat([clientInfo]);
    this.setState({data: newClients});
    $.ajax({
      url: 'add-client.php',
      type: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: clientInfo,
      success: function(response) {
        if (response) {
          $('.message').text('Client credentials added.').delay(3000).fadeOut();
        } else {
          $('.message').text('Something went wrong. Please try again.');
        }
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: clients});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="container">
        <h2 className="hdr">Admin Panel<a href="logout.php" className="btn-logout">Log out</a></h2>
        <ClientForm onAddSubmit={this.handleAddSubmit} />
        <ClientList data={this.state.data} />
      </div>
    );
  }
});

var ClientForm = React.createClass({
  getInitialState: function() {
    return {username: '', email: '', password: '', enabled: false};
  },
  handleUserChange: function(e) {
    this.setState({username: e.target.value});
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleValidity: function(field, value, exists) {
    var validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    value = value.trim();
    if (!value || field === 'email' && !validEmail.test(value) || exists) {
      $('[for=client-'+field+']').addClass('invalid').removeClass('valid');
    } else {
      $('[for=client-'+field+']').addClass('valid').removeClass('invalid')
    }
    if ($('.label.valid').length === $('.label').length) {
      $('#btn-add-client').prop('disabled', false);
    } else {
      $('#btn-add-client').prop('disabled', true);
    }
  },
  checkUserName: function(value) {
    $.ajax({
      url: 'check-user.php',
      type: 'POST',
      data: {username: value}
    }).done(function(response) {
      if (response) {
        this.handleValidity('username', value, true);
      } else {
        this.handleValidity('username', value, false);
      }
    }.bind(this));
  },
  checkEmail: function(value) {
    $.ajax({
      url: 'check-email.php',
      type: 'POST',
      data: {email: value}
    }).done(function(response) {
      if (response) {
        this.handleValidity('email', value, true);
      } else {
        this.handleValidity('email', value, false);
      }
    }.bind(this));
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var username = this.state.username.trim();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    this.props.onAddSubmit({username: username, email: email, password: password});
    this.setState({username: '', email: '', password: '', enabled: false});
    $('[for*=client-]').removeClass('valid invalid');
  },
  render: function() {
    return (
      <form className="form" onSubmit={this.handleSubmit} novalidate>
        <h3 className="sub-hdr">Add Client</h3>
        <label htmlFor="client-username" className="label">User Name <i>- must be unique</i></label>
        <input
          type="text"
          id="client-username"
          className="input"
          name="username"
          value={this.state.username}
          onChange={this.handleUserChange}
          onKeyUp={this.checkUserName.bind(this, this.state.username)} />
        <label htmlFor="client-email" className="label">Email <i>- must be unique</i></label>
        <input
          type="email"
          id="client-email"
          className="input"
          name="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          onKeyUp={this.checkEmail.bind(this, this.state.email)} />
        <label htmlFor="client-password" className="label">Password</label>
        <input
          type="text"
          id="client-password"
          className="input"
          name="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          onKeyUp={this.handleValidity.bind(this, 'password', this.state.password, false)} />
        <input
          type="submit"
          name="submit"
          id="btn-add-client"
          className="btn-primary"
          value="Add Client"
          disabled />
        <p className="message"></p>
      </form>
    );
  }
});

var Client = React.createClass({
  handlePasswordChange: function(e) {
    if (e.keyCode === 27) { // check escape
      this.cancelReset(e);
    } else {
      if (e.target.value.length > 0) {
        $(e.target).next().prop('disabled', false);
      } else {
        $(e.target).next().prop('disabled', true);
      }
    }
  },
  handleClick: function(username, enabled) {
    $.ajax({
      url: 'enable-client.php',
      type: 'POST',
      data: { username: username,
              enabled: enabled }
    });
  },
  toggleReset: function(e) {
    $(e.target).closest('td').addClass('inactive')
      .next().removeClass('inactive')
      .find('.input').focus();
  },
  handleReset: function(e) {
    e.persist();
    e.preventDefault();
    $.ajax({
      url: 'change-password.php',
      type: 'POST',
      data: $(e.target).serialize(),
      success: function(response) {
        this.cancelReset(e);
      }.bind(this)
    });
  },
  cancelReset: function(e) {
    $(e.target).closest('td').addClass('inactive')
      .prev().removeClass('inactive');
  },
  render: function() {
    var rowClass = this.props.enabled == 1 ? 'row-enabled' : 'row-disabled';
    var classes = this.props.enabled == 1 ? 'btn-toggle btn-enabled' : 'btn-toggle btn-disabled';
    var text = this.props.enabled == 1 ? 'Disable' : 'Enable';
    var clientUrl = '../client/' + this.props.username;
    return (
      <tr className={rowClass}>
        <td><a href={clientUrl}>{this.props.username}</a></td>
        <td>{this.props.email}</td>
        <td><button className="btn-reset" onClick={this.toggleReset}>Reset</button></td>
        <td className="inactive">
          <form className="form" onSubmit={this.handleReset} novalidate>
            <input
              type="hidden"
              name="username"
              value={this.props.username} />
            <input
              type="text"
              className="input"
              name="password"
              onKeyUp={this.handlePasswordChange} />
            <button
              type="submit"
              name="submit"
              className="btn-icon fa fa-arrow-right"
              disabled></button>
            <button
              className="btn-icon fa fa-times"
              onClick={this.cancelReset}></button>
          </form>
        </td>
        <td><button className={classes} onClick={this.handleClick.bind(this, this.props.username, this.props.enabled)}><span className="handle">{text}</span></button></td>
      </tr>
    );
  }
});

var ClientList = React.createClass({
  render: function() {
    var clientNodes = this.props.data.map(function(client) {
      return (
        <Client username={client.username} email={client.email} enabled={client.enabled} key={client.id}></Client>
      );
    });
    return (
      <div className="client-container">
        <h3 className="sub-hdr">Client List</h3>
        <table className="client-table">
          <tbody>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Password</th>
              <th>Toggle</th>
            </tr>
            {clientNodes}
          </tbody>
        </table>
      </div>
    );
  }
});

if (null !== document.getElementById('section-clients')) {
  ReactDOM.render(
    <ClientBox pollInterval={1000} />,
    document.getElementById('section-clients')
  );
}
