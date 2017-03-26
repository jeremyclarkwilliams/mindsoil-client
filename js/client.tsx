$(document).ready(function () {

  $('#file-upload').fileupload({
    dataType: 'json',
    maxFileSize: 100 * 1000 * 1000, // 100 MB
    maxChunkSize: 1 * 1000 * 1000, // 10 MB
  });

  // TODO:
  // allow browser navigation within client panel

});

/* global React: true */


/* --------------
    WRAPPER
-------------- */

var ClientBox = React.createClass({
  getInitialState: function() {
    return {directoryList: true, directoryAdd: false, fileAdd: false, folderAdd: false, preview: false, previewType: '', previewPath: '', previewExt: '', buttonAdd: true};
  },
  toggleAdd: function() {
    this.setState({directoryList: !this.state.directoryList,
      directoryAdd: !this.state.directoryAdd,
      preview: false});
  },
  hideAdd: function() {
    this.setState({directoryList: true,
      directoryAdd: false,
      fileAdd: false,
      folderAdd: false,
      preview: false,
      buttonAdd: true});
  },
  backToAdd: function() {
    this.setState({directoryAdd: true,
      fileAdd: false,
      folderAdd: false});
  },
  toggleFileAdd: function() {
    this.setState({fileAdd: !this.state.fileAdd,
      directoryAdd: !this.state.directoryAdd});
  },
  toggleFolderAdd: function() {
    this.setState({folderAdd: !this.state.folderAdd,
      directoryAdd: !this.state.directoryAdd});
    setTimeout( function() { $('#add-folder').focus(); }, 500);
  },
  togglePreview: function(type, path, ext) {
    this.setState({directoryList: !this.state.directoryList,
      preview: true,
      previewType: type,
      previewPath: path,
      previewExt: ext,
      buttonAdd: false});
  },
  clearChecks: function() {
    this.refs.foldersfiles.clearCheacks();
  },
  loadFoldersFiles: function() {
    this.refs.foldersfiles.loadFoldersFiles();
  },
  loadBreadcrumbs: function() {
    this.refs.breadcrumbs.loadBreadcrumbs();
  },
  render: function() {
    return (
      <div className="container">
        <Breadcrumbs
          hideAdd={this.hideAdd}
          loadFoldersFiles={this.loadFoldersFiles}
          ref={'breadcrumbs'}></Breadcrumbs>
        <FoldersFiles
          active={this.state.directoryList}
          preview={this.state.preview}
          toggleAdd={this.toggleAdd}
          togglePreview={this.togglePreview}
          loadBreadcrumbs={this.loadBreadcrumbs}
          ref={'foldersfiles'}></FoldersFiles>
        <AddButtons
          active={this.state.directoryAdd}
          toggleFileAdd={this.toggleFileAdd}
          toggleFolderAdd={this.toggleFolderAdd}></AddButtons>
        <FileAdd
          active={this.state.fileAdd}
          hideAdd={this.hideAdd}
          loadBreadcrumbs={this.loadBreadcrumbs}
          loadFoldersFiles={this.loadFoldersFiles}></FileAdd>
        <FolderAdd
          active={this.state.folderAdd}
          hideAdd={this.hideAdd}
          loadBreadcrumbs={this.loadBreadcrumbs}
          loadFoldersFiles={this.loadFoldersFiles}></FolderAdd>
        <Preview
          active={this.state.preview}
          type={this.state.previewType}
          path={this.state.previewPath}
          ext={this.state.previewExt}></Preview>
        <button
          className={this.state.directoryAdd || this.state.fileAdd || this.state.folderAdd ? (this.state.buttonAdd ? 'btn-add close' : 'btn-add close hide') : (this.state.buttonAdd ? 'btn-add' : 'btn-add hide')}
          id="btn-add"
          title="Add file or folder"
          onClick={this.state.fileAdd || this.state.folderAdd ? this.backToAdd : this.toggleAdd}></button>
      </div>
    );
  }
});


/* --------------
    BREADCRUMBS
-------------- */

var Breadcrumbs = React.createClass({
  loadBreadcrumbs: function() {
    $.ajax({
      type: 'POST',
      url: 'get-breadcrumbs.php',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({paths: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('get-breadcrumbs.php', status, err.toString());
      }.bind(this)
    }).done(function() {
      this.setState({hdrWidth: $('#breadcrumbs').width()});
      this.setState({crumbWidth: this.crumbsWidth()});
      this.truncate();
    }.bind(this));
  },
  getInitialState: function() {
    return {paths: [], hdrWidth: 0, crumbWidth: 0};
  },
  componentDidMount: function() {
    $(window).on('resize', this.handleResize);
    this.loadBreadcrumbs();
  },
  componentWillUnmount: function() {
    $(window).off('resize');
  },
  handleClick: function(path) {
    $.ajax({
      url: 'change-path.php',
      type: 'POST',
      data: { path: path },
      success: function(response) {
        if (response) {
          this.loadBreadcrumbs();
          this.props.loadFoldersFiles();
          this.props.hideAdd();
        }
      }.bind(this)
    });
  },
  handleResize: function(e) {
    prevHdrWidth = this.state.hdrWidth;
    this.setState({hdrWidth: $('#breadcrumbs').width()});
    // just passed 991px width in either direction (font size change)
    if (prevHdrWidth < this.state.hdrWidth && prevHdrWidth >= 991 && this.state.hdrWidth <= 991 || prevHdrWidth > this.state.hdrWidth && prevHdrWidth <= 991 && this.state.hdrWidth >= 991) {
      this.setState({crumbWidth: this.crumbsWidth()});
    }
    this.truncate();
  },
  crumbsWidth: function() {
    var crumbsWt = 0,
        $crumbs = $('#breadcrumbs .crumb');
    for (var i = 0; i < $crumbs.length; i++) {
      crumbsWt += $crumbs.eq(i).width();
    }
    return crumbsWt;
  },
  truncate: function() {
    if (this.state.crumbWidth > this.state.hdrWidth && !$('#breadcrumbs .crumb').last().prev().hasClass('trunc')) {
      $('#breadcrumbs .crumb').not('.trunc, :last-child').eq(1).addClass('trunc');
      if ($('#breadcrumbs .trunc').length > 1) {
        $('#breadcrumbs .trunc').eq(0).hide();
      }
    } else if (this.state.crumbWidth < this.state.hdrWidth && $('#breadcrumbs .trunc').length > 0) {
      $('#breadcrumbs .trunc').show().removeClass('trunc');
    }
  },
  render: function() {
    var path = '';
    return (
      <ol className="hdr" id="breadcrumbs">
        {this.state.paths.map(function(directory, index) {
          path += (index <= 1) ? directory : '/' + directory;
          if (this.state.paths.length == 1) {
            return <li className="crumb" key={index}>All Files</li>;
          } else if (index == 0) {
            return <li className="crumb" key={index}><button className="btn-crumb" onClick={this.handleClick.bind(this, path)}>All Files</button></li>
          } else if (index == this.state.paths.length - 1) {
            return <li className="crumb" key={index}>{directory}</li>
          } else {
            return <li className="crumb" key={index}><button className="btn-crumb" onClick={this.handleClick.bind(this, path)}>{directory}</button></li>
          }
        }.bind(this))}
      </ol>
    );
  }
});


/* --------------
    CHECKBOX
-------------- */

var Checkbox = React.createClass({
  // handleCheckbox: function(path, index) {
  //   this.props.handleCheckbox(path, index);
  // },
  render: function() {
    return (
      <button className={this.props.active ? 'checkbox checked' : 'checkbox'} onClick={this.props.handleCheckbox}></button>
    );
  }
});


/* --------------
    DIRECTORIES
-------------- */

var FoldersFiles = React.createClass({
  loadFoldersFiles: function() {
    $.ajax({
      type: 'POST',
      url: 'get-folders-files.php',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({folders: data.folders, files: data.files, types: data.type, folderpaths: data.folderpath, filepaths: data.filepath, exts: data.ext, preview: data.preview});
        // no folders/files and active and not preview
        if (this.state.folders.length == 0 && this.state.files.length == 0 && this.props.active && !this.state.preview) {
          this.props.toggleAdd();
        } else if (this.state.preview) {
          this.props.togglePreview(this.state.types[0], this.state.filepaths[0], this.state.exts[0]);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('get-folders-files.php', status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {client: window.location.pathname.split('/').pop(), folders: [], files: [], types: [], folderpaths: [], filepaths: [], exts: [], preview: this.props.preview, selectedFiles: [], checked:[]};
  },
  componentDidMount: function() {
    this.loadFoldersFiles();
  },
  handleClick: function(path, type, ext) {
    $.ajax({
      url: 'change-path.php',
      type: 'POST',
      data: { path: path },
      success: function(response) {
        if (response) {
          this.clearChecks();
          this.loadFoldersFiles();
          this.props.loadBreadcrumbs();
        }
      }.bind(this)
    }).done(function() {
      $('.btn-file').blur();
    });
  },
  handleCheckbox: function(path, index) {
    var filesArray = this.state.selectedFiles;
    var checkedArray = this.state.checked;
    if (checkedArray[index]) { // file has been selected
      var cellIndex = filesArray.indexOf(path);
      filesArray.splice(cellIndex, 1);
    } else { // file has not been selected
      filesArray.push(path);
    }
    checkedArray[index] = !checkedArray[index];
    this.setState({selectedFiles: filesArray,
      checked: checkedArray});
  },
  clearChecks: function() {
    this.setState({selectedFiles: [],
      checked: []});
  },
  triggerDownload: function() {
    if (this.download !== null) {
      this.download.click();
      $('.btn-file').blur();
    }
  },
  downloadButton: function(type, path) {
    if (type == 'doc') {
      return <span className="btn btn-download">Download<a href={path} download ref={(ref) => this.download = ref}></a></span>;
    }
  },
  downloadMultiple: function() {
    $.ajax({
      url: 'zip-files.php',
      type: 'POST',
      data: { files: this.state.selectedFiles },
      success: function(response) {
        if (response) {
          this.downloadZip.click();
          this.clearChecks();
          this.loadFoldersFiles();
        }
      }.bind(this)
    }).done(function() {
      $('.btn-download').blur();
    });
  },
  render: function() {
    return (
      <ul className={this.props.active ? 'directory-list active' : 'directory-list'} id="directory-list">
        {this.state.folders.map(function(folder, index) {
          path = this.state.folderpaths[index];
          return <li className="directory-item folder" key={index}><button className="btn-file" data-path={path} onClick={this.handleClick.bind(this, path)}>{folder}</button></li>
        }.bind(this))}
        {this.state.files.map(function(file, index) {
          type = this.state.types[index];
          path = this.state.filepaths[index];
          downloadPath = this.state.client + path;
          ext = this.state.exts[index];
          checked = this.state.checked[index];
          return <li className={'directory-item file ' + type} key={index}><button className="btn-file" onClick={type == 'doc' ? this.triggerDownload : this.handleClick.bind(this, path)}>{file}{this.downloadButton(type, downloadPath)}</button><Checkbox path={path} handleCheckbox={this.handleCheckbox.bind(this, path, index)} active={checked} index={index}></Checkbox></li>
        }.bind(this))}
        <li className={this.state.checked.length > 0 ? 'directory-item download active' : 'directory-item download'}><button className="btn btn-download" onClick={this.downloadMultiple}>Download Selected</button><a href={this.state.client + '/files.zip'} class="download-zip" download ref={(ref) => this.downloadZip = ref}></a></li>
      </ul>
    );
  }
});


/* --------------
    ADD BUTTONS
-------------- */

var AddButtons = React.createClass({
  render: function() {
    return (
      <div className={this.props.active ? 'directory-add active' : 'directory-add'} id="directory-add">
        <button className="btn-upload" id="btn-add-file" onClick={this.props.toggleFileAdd}>Upload File</button>
        <button className="btn-upload" id="btn-add-folder" onClick={this.props.toggleFolderAdd}>Create Folder</button>
      </div>
    );
  }
});


/* --------------
    ADD FILE
-------------- */

var FileAdd = React.createClass({
  triggerUpload: function() {
    $('#file-upload').trigger('click')
    .fileupload({
      add: function (e, data) {
        data.submit();
      },
      progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        progress += 5;
        $('#add-file').css({
          'background': 'linear-gradient(45deg, #666666 '+progress+'%, #ffffff '+progress+'%)'
        });
      },
      done: function (e, data) {
        $('#add-file').css({
          'background': 'rgba(255,255,255,0.7)'
        });
        this.props.hideAdd();
        this.props.loadFoldersFiles();
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className={this.props.active ? 'directory-add file-add active' : 'directory-add file-add'} id="file-add">
        <form className="form">
          <input id="file-upload" className="input input-hide" type="file" name="files[]" data-url="upload-file.php" multiple />
          <label for="add-file" className="label no-label label-file">Select File</label>
          <input id="add-file" type="text" className="input input-icon input-file" placeholder="Select File" onClick={this.triggerUpload} />
        </form>
      </div>
    );
  }
});


/* --------------
    ADD FOLDER
-------------- */

var FolderAdd = React.createClass({
  getInitialState: function() {
    return {folder: ''};
  },
  handleFolderChange: function(e) {
    this.setState({folder: e.target.value});
  },
  handleValidity: function(field, value) {
    value = value.trim();
    // set to true if value doesn't exist or contains not: letters, numbers, dashes, underscores
    var invalid = !value || /[^\w\-]+/ig.test(value);
    // check if folder name exists
    this.checkFolderName(value)
      .done(function(result) {
        // result is true if entered value matches existing folder
        invalid = invalid || result;
        // perform actions based on input validity
        if (invalid) {
          $('[for=add-'+field+']').addClass('invalid').removeClass('valid');
        } else {
          $('[for=add-'+field+']').addClass('valid').removeClass('invalid')
        }
        if ($('#folder-add .label.valid').length === $('#folder-add .label').length) {
          $('#btn-create-folder').prop('disabled', false);
        } else {
          $('#btn-create-folder').prop('disabled', true);
        }
      });
  },
  checkFolderName: function(value) {
    return $.ajax({
      url: 'check-folder.php',
      type: 'POST',
      data: {folder: value}
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var folder = this.state.folder.trim();
    // create folder/directory
    $.ajax({
      url: 'create-folder.php',
      type: 'POST',
      data: {folder: folder},
      success: function(response) {
        if (response) {
          this.props.hideAdd();
          this.props.loadBreadcrumbs();
          this.props.loadFoldersFiles();
        }
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className={this.props.active ? 'directory-add folder-add active' : 'directory-add folder-add'} id="folder-add">
        <form className="form" onSubmit={this.handleSubmit} novalidate>
          <label htmlFor="add-folder" className="label no-label label-folder">Folder Name</label>
          <input
            type="text"
            id="add-folder"
            className="input input-icon"
            name="folder"
            placeholder="Folder Name"
            value={this.state.folder}
            onChange={this.handleFolderChange}
            onKeyUp={this.handleValidity.bind(this, 'folder', this.state.folder)} />
          <input
            type="submit"
            name="submit"
            id="btn-create-folder"
            className="btn-upload"
            value="Create Folder"
            disabled />
        </form>
      </div>
    );
  }
});


/* --------------
    PREVIEW
-------------- */

var Preview = React.createClass({
  getInitialState: function() {
    return {type: '', path: '', ext: ''};
  },
  setValues: function() {
    this.setState({type: this.props.type, path: this.props.path, ext: this.props.ext});
  },
  componentDidMount: function() {
    setInterval(this.setValues, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className={this.props.active ? 'file-preview active' : 'file-preview'} id="file-preview">
        {this.state.type == 'image' ? <img src={this.state.path} className="img-preview" /> : null }
        {this.state.type == 'video' ? <video className="video-preview" controls><source src={this.state.path} type={'video/'+this.state.ext} /></video> : null }
        {this.state.type == 'pdf' ? <iframe src={this.state.path} className="pdf-preview" /> : null }
        <a href={this.state.path} className="btn btn-download" download>Download</a>
      </div>
    );
  }
});

ReactDOM.render(
  <ClientBox />,
  document.getElementById('client-panel')
);
