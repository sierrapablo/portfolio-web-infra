resource "docker_image" "this" {
  name = var.image_name

  build {
    context    = var.build_context
    dockerfile = var.dockerfile
  }
}

resource "docker_container" "this" {
  name    = var.name
  image   = docker_image.this.image_id
  restart = var.restart_policy

  volumes {
    volume_name    = var.volume_name
    container_path = "/usr/share/nginx/html"
    host_path      = var.host_path
    read_only      = false
  }

  networks_advanced {
    name = var.network_name
  }
}
