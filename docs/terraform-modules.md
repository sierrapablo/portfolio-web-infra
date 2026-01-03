# Terraform Modules

This directory contains reusable, self-contained Terraform modules for managing the Docker-based infrastructure.

## Available Modules

| Module        | Description                                            | Key Features                                                |
| :------------ | :----------------------------------------------------- | :---------------------------------------------------------- |
| **`network`** | Manages Docker networks for container communication.   | Supports external networks and custom drivers.              |
| **`nodejs`**  | Handles Node.js image builds and container deployment. | Custom Dockerfile support, volume mounting, and networking. |
| **`volume`**  | Manages persistent Docker volumes.                     | Includes `prevent_destroy` lifecycle for data safety.       |

---

## Module Details

### 1. Network Module (`/terraform/modules/network`)

Used to create or data-fetch Docker networks.

- **Resources**: `docker_network`, `data.docker_network`.
- **Key Variables**:
  - `name`: The name of the network.
  - `external`: Boolean to indicate if the network is managed outside Terraform.
  - `driver`: Network driver (default: `bridge`).

### 2. Node.js Module (`/terraform/modules/nodejs`)

A complete module that builds a Node.js image and runs the corresponding container for Astro SSR.

- **Resources**: `docker_image` (with build context), `docker_container`.
- **Key Features**:
  - **Custom Build**: Can build images from a local context and Dockerfile.
  - **SSR Runtime**: Mounts a volume to `/app` containing the Astro SSR build.
  - **Isolation**: Connects the container to a dedicated Docker network.

### 3. Volume Module (`/terraform/modules/volume`)

Manages named volumes for persistent data storage.

- **Resources**: `docker_volume`.
- **Safety**: Uses Terraform `lifecycle { prevent_destroy = true }` to avoid accidental data loss during infrastructure changes.

---

## Best Practices

1.  **Versioning**: Always use `versions.tf` in modules to specify required provider versions.
2.  **Naming**: Follow a consistent naming convention for resources (e.g., using `this` as the resource ID within the module).
3.  **Outputs**: Ensure modules expose necessary attributes (IDs, names, ARNs) in `outputs.tf` for consumption by the root module.

You can find more information about modules in the [Terraform documentation](https://www.terraform.io/language/modules).
