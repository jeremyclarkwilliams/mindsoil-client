<? include '../incs/head.php'; ?>
    
  <? include '../incs/nav.php'; ?>

  <section class="section section-video">
    <video poster="<?= $baseurl ?>/media/carmageddon-poster.jpg" class="video" id="video-project">
      <source src="<?= $baseurl ?>/media/carmageddon-video-01_3mbps.mp4" type="video/mp4">
    </video>
    <button class="btn-play fa fa-play" id="btn-play" title="Play"></button>
  </section>

  <section class="section section-sub">
    <div class="container">
      <h3 class="hdr">Carmageddon</h3>
      <h4 class="hdr-sub">Objective</h4>
      <p class="desc">Create a stylized visual document that captures one of the largest road widening projects in the history of Los Angeles.</p>
      <h4 class="hdr-sub">Solution</h4>
      <p class="desc">Because of the variables that controlled the timing of key events during the construction, "just rolling" was not a sustainable media asset management strategy. We were able to focus on key events to create a clear visual narrative by developing clear lines of communication with project foremen. Utilizing timelapse photography mixed with HD video and various local news audio, we condensed a four day storyline into four minutes. This project was done on spec as a self promotion piece. All assets are currently available as stock footage or select prints.</p>
      <!--<p class="desc"><a href="#">View all the films here.</a></p>-->
    </div>
    <div class="container more-container">
      <h3 class="hdr">More Projects</h3>
      <ul class="project-list">
        <li class="project-item project-03"><a href="<?= $baseurl ?>/projects/claudiaendler" class="link">Claudia Endler</a></li>
        <li class="project-item project-01"><a href="<?= $baseurl ?>/projects/ocearch" class="link">Ocearch</a></li>
      </ul>
    </div>
  </section>
  
  <? include '../incs/footer.php'; ?>

<? include '../incs/foot.php'; ?>
