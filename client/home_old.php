<? include '../incs/session.php'; ?>

<? include '../incs/head.php'; ?>
    
  <? include '../incs/nav.php'; ?>

  <?
    $dir = $_SESSION['user'] . $_SESSION['dir'];
    $folders = [];
    $files = [];

    if (is_dir($dir) && $dh = opendir($dir)) {
      while (($file = readdir($dh)) !== false) {
        if ($file != '.' && $file != '..'  && strpos($file,'.') !== 0) {
          if (is_dir($dir.'/'.$file)) { array_push($folders, $file); }
          else { array_push($files, $file); }
        }
      }
      closedir($dh);
    }
  ?>
    
  <section class="section section-grid">
    <ol class="hdr" id="breadcrumbs">
      <?
        // list out breadcrumbs
        $dir_structure = $_SESSION['dir'];
        $dir_array = preg_split('[\/]', $dir_structure, -1, PREG_SPLIT_NO_EMPTY);
        $dir_build = '';
        $dir_n = count($dir_array);
        for($i = -1; $i < $dir_n; $i++) {
          $dir_build = $dir_build . $dir_array[$i] . '/';
          // first and only crumb
          if ($dir_n == 0):
            echo '<li class="crumb">All Files</li>';
          // first crumb
          elseif ($i == -1):
            echo '<li class="crumb"><button class="btn-crumb" data-path="' . $dir_build . '">All Files</button></li>';
          // last crumb
          elseif ($i == $dir_n - 1):
            echo '<li class="crumb">' . $dir_array[$i] . '</li>';
          // inbetween crumbs
          else:
            echo '<li class="crumb"><button class="btn-crumb" data-path="' . $dir_build . '">' . $dir_array[$i] . '</button></li>';
          endif;
        }
      ?>
    </ol>
  <? if (is_dir($dir)): ?>
    <ul class="directory-list active" id="directory-list">
      <?
        // list out folders first
        for($i = 0; $i < count($folders); $i++) {
          echo '<li class="directory-item folder"><button class="btn-file" data-path="' . $_SESSION['dir'] . $folders[$i] . '/' . '">' . $folders[$i] . '</button></li>';
        }
        // list out files
        for($i = 0; $i < count($files); $i++) {
          $ext = pathinfo($files[$i], PATHINFO_EXTENSION);
          $file_type = '';
          $file_path = $baseurl . '/client/' . $dir . $files[$i];
          if (preg_match('/jpg|jpeg|png|gif/', $ext)) { $file_type = ' image'; }
          elseif (preg_match('/mov|mpeg|avi|mp4|m4v/', $ext)) { $file_type = ' video'; }
          else { $file_type = ' doc'; }
          echo '<li class="directory-item file' . $file_type . '"><button class="btn-file" data-path="' . $_SESSION['dir'] . $files[$i] . '">' . $files[$i];
          if ($file_type == ' doc'): echo '<a href="' . $file_path . '" class="btn btn-download" download>Download</a>'; endif;
          echo '</button></li>';
        }
      ?>
    </ul>
    <div class="directory-add" id="directory-add">
      <button class="btn-upload" id="btn-add-file">Upload File</button>
      <button class="btn-upload" id="btn-add-folder">Create Folder</button>
    </div>
    <div class="directory-add file-add" id="file-add">
      <form class="form">
        <input id="file-upload" class="input input-hide" type="file" name="files[]" data-url="upload-file.php" multiple />
        <label for="add-file" class="label no-label label-file">Select File</label>
        <input id="add-file" type="text" class="input input-icon input-file" placeholder="Select File" />
      </form>
    </div>
    <div class="directory-add folder-add" id="folder-add"></div>
    <button class="btn-add" id="btn-add" title="Add file or folder"></button>
  <? else: ?>
    <div class="file-preview" id="file-preview">
      <?
        $file_path = $baseurl . '/client/' . $dir;
        $ext = pathinfo($dir, PATHINFO_EXTENSION);
        if (preg_match('/jpg|jpeg|png|gif/', $ext)) {
          echo '<img src="' . $file_path . '" class="img-preview" />';
        } elseif (preg_match('/mov|mpeg|avi|mp4|m4v/', $ext)) {
          echo '<video class="video-preview" controls>' .
               '<source src="' . $file_path . '" type="video/' . $ext . '">' .
               '</video>';
        }
      ?>
      <a href="<?= $file_path ?>" class="btn btn-download" download>Download</a>
    </div>
  <? endif; ?>
  </section>
  
  <? include '../incs/footer.php'; ?>

<? include '../incs/foot.php'; ?>