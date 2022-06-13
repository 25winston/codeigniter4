<script src="<?php echo base_url("build/vendor.js?_" . time()); ?>"></script>
<!-- <script type="module" src="<?php echo base_url("build/bundle.js?_" . time()); ?>"> -->
<script src="<?php echo base_url("build/a.js?_" . time()); ?>">
</script>

<?php if (ENVIRONMENT !== "production") {
  echo '<script  src="//' . $_SERVER["SERVER_NAME"] . ':35729/livereload.js"></script>';
} ?>
</body>

</html>