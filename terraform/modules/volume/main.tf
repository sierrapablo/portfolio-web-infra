resource "docker_volume" "this" {
  name   = var.name
  driver = var.driver

  lifecycle {
    prevent_destroy = true
  }
}
