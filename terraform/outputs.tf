output "project" {
  description = "Nombre del proyecto"
  value       = var.project_name
}

output "reverse_proxy_network_name" {
  value = module.reverse_proxy_network.name
}

output "reverse_proxy_network_id" {
  value = module.reverse_proxy_network.id
}

output "dist_volume_name" {
  value = module.portfolio_dist_volume.name
}

output "dist_volume_mountpoint" {
  value = module.portfolio_dist_volume.mountpoint
}

output "nodejs_container" {
  value = module.nodejs.container_name
}
