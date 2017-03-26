/* global React: true */

var ContactBox = React.createClass({
  handleContactSubmit: function(contactInfo) {
    $('.message').text('Sending message...');
    $.ajax({
      url: this.props.url,
      type: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      data: contactInfo,
      success: function(response) {
        setTimeout(function() {
          if (response) {
            $('.message').text('Thanks for contacting Mindsoil.');
            $('.label').removeClass('valid invalid');
            $('#btn-submit').prop('disabled', true);
          } else {
            $('.message').text('Message could not be sent. Please try again.');
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
        <h2 className="hdr hdr-home">Get in touch.</h2>
        <h2 className="hdr hdr-contact">Say hello.</h2>
        <ContactForm onContactSubmit={this.handleContactSubmit} />
      </div>
    );
  }
});

var ContactForm = React.createClass({
  getInitialState: function() {
    return {name: '', email: '', message: ''};
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handleMessageChange: function(e) {
    this.setState({message: e.target.value});
  },
  handleValidity: function(field, value) {
    var validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    value = value.trim();
    if (!value || field === 'email' && !validEmail.test(value)) {
      $('[for=contact-'+field+']').addClass('invalid').removeClass('valid');
    } else {
      $('[for=contact-'+field+']').addClass('valid').removeClass('invalid')
    }
    if ($('.label.valid').length === $('.label').length) {
      $('#btn-submit').prop('disabled', false);
    } else {
      $('#btn-submit').prop('disabled', true);
    }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    var email = this.state.email.trim();
    var message = this.state.message.trim();
    this.props.onContactSubmit({name: name, email: email, message: message});
    setTimeout(function() { this.setState({name: '', email: '', message: ''}); }.bind(this), 2000);
  },
  render: function() {
    return (
      <form className="form" onSubmit={this.handleSubmit} novalidate>
        <label htmlFor="contact-name" className="label">Name</label>
        <input
          type="text"
          id="contact-name"
          className="input"
          name="name"
          value={this.state.name}
          onChange={this.handleNameChange}
          onKeyUp={this.handleValidity.bind(this, 'name', this.state.name)} />
        <label htmlFor="contact-email" className="label">Email</label>
        <input
          type="email"
          id="contact-email"
          className="input"
          name="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          onKeyUp={this.handleValidity.bind(this, 'email', this.state.email)} />
        <label htmlFor="contact-message" className="label">Message</label>
        <textarea
          id="contact-message"
          className="textarea"
          name="message"
          value={this.state.message}
          onChange={this.handleMessageChange}
          onKeyUp={this.handleValidity.bind(this, 'message', this.state.message)}>
        </textarea>
        <input
          type="submit"
          name="submit"
          id="btn-submit"
          className="btn-submit"
          value="Send"
          disabled />
        <p className="message"></p>
      </form>
    );
  }
});

ReactDOM.render(
  <ContactBox url="form/contact.php" />,
  document.getElementById('section-contact')
);
