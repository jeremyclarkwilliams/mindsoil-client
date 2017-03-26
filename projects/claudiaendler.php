<? include '../incs/head.php'; ?>
    
  <? include '../incs/nav.php'; ?>

  <section class="section section-video swiper-container">
    <div class="swiper-wrapper">
      <video poster="<?= $baseurl ?>/media/claudiaendler-poster.jpg" class="video swiper-slide" id="video-project-01">
        <source src="<?= $baseurl ?>/media/claudiaendler-video-01_3mbps.mp4" type="video/mp4">
      </video>
      <video class="video swiper-slide" id="video-project-02">
        <source src="<?= $baseurl ?>/media/claudiaendler-video-02_3mbps.mp4" type="video/mp4">
      </video>
      <video class="video swiper-slide" id="video-project-03">
        <source src="<?= $baseurl ?>/media/claudiaendler-video-03_3mbps.mp4" type="video/mp4">
      </video>
      <video class="video swiper-slide" id="video-project-04">
        <source src="<?= $baseurl ?>/media/claudiaendler-video-04_3mbps.mp4" type="video/mp4">
      </video>
    </div>
    <button class="btn-play fa fa-play" id="btn-play" title="Play"></button>
  </section>

  <section class="section section-video-titles" id="section-video-titles">
    <button class="btn-video-title active">The Story</button>
    <button class="btn-video-title">Teaser 1</button>
    <button class="btn-video-title">Teaser 2</button>
    <button class="btn-video-title">Behind the Scenes</button>
  </section>

  <section class="section section-sub">
    <div class="container">
      <h3 class="hdr">Claudia Endler Designs</h3>
      <h4 class="hdr-sub">Objective</h4>
      <p class="desc">With CED, the body of work speaks for itself. Our goal was to dig deeper into the artist, her process and creative environment to re-engage and expand her online audience.</p>
      <h4 class="hdr-sub">Solution</h4>
      <p class="desc">Utilizing high-speed, macro photography we centered on Claudia’s design process. We further illustrated  her insight by incorporating original music and highly-focused voice over. The result is a one minute film that leaves the viewer with a newfound sense of the passion and personality behind Claudia Endler Designs.</p>
      <p class="desc">Additional assets were created to be utilized throughout the ad campaign in various outlets. These include frame grabs, a variety of Instagram teasers and a behind-the-scenes video that reveals more about the artist.</p>
      <!--<p class="desc"><a href="#">View all the films here.</a></p>-->
    </div>
    <div class="container more-container">
      <h3 class="hdr">More Projects</h3>
      <ul class="project-list">
        <li class="project-item project-01"><a href="<?= $baseurl ?>/projects/ocearch" class="link">Ocearch</a></li>
        <li class="project-item project-02"><a href="<?= $baseurl ?>/projects/carmageddon" class="link">Carmageddon</a></li>
      </ul>
    </div>
  </section>
  
  <? include '../incs/footer.php'; ?>

<? include '../incs/foot.php'; ?>
