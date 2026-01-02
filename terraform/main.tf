module "reverse_proxy_network" {
  source = "./modules/network"

  name     = var.reverse_proxy_network_name
  external = var.reverse_proxy_network_external
}

module "portfolio_dist_volume" {
  source = "./modules/volume"

  name = var.portfolio_dist_volume_name

  labels = {
    project     = var.project_name
    environment = var.environment
    purpose     = "static-assets"
  }
}

module "nginx" {
  source = "./modules/nginx"

  name          = var.nginx_name
  image_name    = var.nginx_image_name
  build_context = var.nginx_build_context

  network_name = module.reverse_proxy_network.name
  volume_name  = module.portfolio_dist_volume.name

  host_path = var.host_path
}
