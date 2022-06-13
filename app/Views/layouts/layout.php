<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="<?php echo base_url("build/bundle.css?_" . (getenv('CI_ENVIRONMENT') === 'production' ? VERSION : time())); ?>">
  <title></title>
</head>

<body>

  <div id="app"></div>

  <script src="<?php echo base_url("build/bundle.js?_" . (getenv('CI_ENVIRONMENT') === 'production' ? VERSION : time())); ?>"></script>
  <?php if (ENVIRONMENT !== "production") {
    echo '<script  src="//' . $_SERVER["SERVER_NAME"] . ':35729/livereload.js"></script>';
  } ?>
</body>

</html>