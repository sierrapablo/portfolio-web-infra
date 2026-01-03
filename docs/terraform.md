# Terraform Root Configuration

This directory contains the root Terraform configuration for the Portfolio Web infrastructure. It orchestrates the various modules to deploy a containerized Node.js environment for Astro SSR with networking and persistent storage.

## Architecture Overview

The infrastructure is composed of:

1.  **Network**: A dedicated Docker bridge network for container isolation.
2.  **Volume**: Persisted storage for the Astro SSR build (server and client assets).
3.  **Container**: A Node.js instance built and deployed from a local Dockerfile.

## File Structure

| File               | Description                                                                        |
| :----------------- | :--------------------------------------------------------------------------------- |
| **`main.tf`**      | Orchestrates the infrastructure by calling the modules.                            |
| **`variables.tf`** | Declares all configuration parameters with validation where needed.                |
| **`versions.tf`**  | Specifies Terraform version and provider constraints (e.g., `kreuzwerker/docker`). |
| **`outputs.tf`**   | Exposes relevant attributes (container names, network IDs).                        |

---

## Prerequisites

- **Terraform**: `v1.5.0` or higher.
- **Docker Engine**: Must be running on the host machine.
- **Provider**: `kreuzwerker/docker` provider (automatically downloaded on `init`).

## Configuration (Variables)

Key variables used in this configuration:

- `project_name`: Used for labeling resources.
- `environment`: Deployment environment (e.g., `prod`, `dev`).
- `nodejs_image_name`: Name for the built Docker image.
- `host_path`: Path on the host machine for volume data (Astro SSR build).

---

## Deployment Workflow

### 1. Initialization

Downloads providers and prepares the backend:

```bash
terraform init
```

### 2. Validation & Formatting

Ensure code quality (handled automatically by Jenkins `format.Jenkinsfile`):

```bash
terraform fmt
terraform validate
```

### 3. Planning

Review the changes before applying:

```bash
terraform plan
```

### 4. Application

Deploy the infrastructure (handled by Jenkins `deploy.Jenkinsfile`):

```bash
terraform apply
```
