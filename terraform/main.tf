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
    purpose     = "ssr-build"
  }
}

module "nodejs" {
  source = "./modules/nodejs"

  name          = var.nodejs_name
  image_name    = var.nodejs_image_name
  build_context = var.nodejs_build_context

  network_name = module.reverse_proxy_network.name
  volume_name  = module.portfolio_dist_volume.name

  host_path = var.host_path
}
