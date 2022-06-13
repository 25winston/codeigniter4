<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="<?php echo base_url("build/vendor.css?_" . time()); ?>">
  <link rel="stylesheet" href="<?php echo base_url("build/bundle.css?_" . time()); ?>">
  <title>Document</title>
</head>

<body>

  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="">
        Bootstrap
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <!-- Content here -->

      <router-view></router-view>

    </div>

  </div>

  <script src="<?php echo base_url("build/vendor.js?_" . time()); ?>"></script>
  <script src="<?php echo base_url("build/bundle.js?_" . time()); ?>"></script>
  <?php if (ENVIRONMENT !== "production") {
    echo '<script  src="//' . $_SERVER["SERVER_NAME"] . ':35729/livereload.js"></script>';
  } ?>
</body>

</html>