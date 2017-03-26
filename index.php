<? include 'incs/head.php'; ?>
    
  <? include 'incs/nav.php'; ?>

  <div class="swiper-wrapper">

    <section class="section section-main swiper-slide">
      <h1 class="hdr-sub">Creative Agency + Production Company</h1>
      <h2 class="hdr">Where Ideas Grow</h2>
      <button class="btn-down" title="Next Section"></button>
      <video autoplay loop poster="media/bg-home-poster.jpg" class="video" id="video-home">
        <source src="media/bg-home_3mbps.mp4" type="video/mp4">
      </video>
    </section>

    <section class="section section-about swiper-slide">
      <h2 class="hdr">We create emotional connections between brands and their audience.</h2>
      <a href="about" class="btn-link">Learn More</a>
      <button class="btn-down" title="Next Section"></button>
    </section>

    <section class="section section-projects swiper-slide swiper-container">
      <div class="swiper-wrapper">
        <article class="project project-01 swiper-slide">
          <h2 class="hdr-sub">Ocearch</h2>
          <h3 class="hdr">Cultivating a narrative to educate and inspire in near-real time.</h3>
          <a href="projects/ocearch" class="btn-link">View Project</a>
        </article>
        <article class="project project-02 swiper-slide">
          <h2 class="hdr-sub">Carmageddon</h2>
          <h3 class="hdr">Creating a visual document of LA's $1 billion freeway widening project.</h3>
          <a href="projects/carmageddon" class="btn-link">View Project</a>
        </article>
      </div>
      <ul class="pag"></ul>
      <button class="btn-prev"></button>
      <button class="btn-next"></button>
      <button class="btn-down" title="Next Section"></button>
    </section>

    <section class="section section-contact swiper-slide" id="section-contact"></section>

    <? include 'incs/footer.php'; ?>

  </div>

<? include 'incs/foot.php'; ?>
