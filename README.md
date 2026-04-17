# CDNM Documentation Portal

![Deploy Status](https://img.shields.io/github/actions/workflow/status/harshithayentrapragada/cdnm/deploy.yml?branch=main)
![Live Site](https://img.shields.io/badge/Live%20Site-Available-green)

---

## Overview

The CDNM Documentation Portal is a role-based interface designed to simplify access to Gen3 platform resources. It provides a structured and guided experience for users by organizing documentation and workflows based on their role.

This implementation focuses on usability, clarity, and establishing a scalable foundation for future enhancements.

---

## Live Application

**Access the application here:**
https://harshithayentrapragada.github.io/cdnm/

---

## CI/CD Architecture

<p align="center">
  <img src="cicd-architecture.png.png" alt="CI/CD Pipeline" width="800"/>
</p>

---

## Objective

**Primary goals of this project:**

* Provide a clear entry point for users interacting with the Gen3 platform
* Organize resources in a role-specific and intuitive manner
* Reduce friction in accessing documentation and tools
* Establish a maintainable and deployable front-end structure

---

## Key Capabilities

### 1. Role-Based Navigation

The portal supports two primary user roles:

* **Researcher**
* **Developer / Engineer**

Each role is presented with relevant resources to reduce unnecessary complexity.

---

### 2. Structured Resource Access

Key platform resources are organized and simplified:

* Data Dictionary
* Query Examples
* Analysis Notebooks
* Platform usage guidance

Duplicate or redundant entries have been removed to improve clarity.

---

### 3. User Experience Improvements

**Enhancements implemented:**

* Simplified navigation structure
* Clean and consistent layout
* Proper alignment and spacing
* Logical grouping of actions
* Removal of duplicate UI elements

---

### 4. Feedback Mechanism

A lightweight feedback system allows users to:

* Submit usability feedback
* Suggest improvements

This is intentionally separated from technical issue tracking.

---

## Architecture

**Technology stack:**

* **Frontend:** HTML, CSS, JavaScript
* **Hosting:** GitHub Pages
* **CI/CD:** GitHub Actions
* **Structure:** Modular static components

---

## CI/CD Implementation

A branch-based workflow ensures safe and controlled deployment.

### Development Environment (dev)

* Used for implementing and testing changes
* Triggers CI pipeline for validation
* Does not deploy to production

### Production Environment (main)

* Contains stable code
* Triggers deployment
* Automatically updates the live application

---

### Workflow

```text
dev → validate → merge → main → deploy → live
```

---

## Development Process

### Develop and Test (dev)

```bash
git checkout dev
git add .
git commit -m "Update feature"
git push origin dev
```

### Deploy to Production (main)

```bash
git checkout main
git merge dev
git push origin main
```

---

## Design Considerations

* Separation of development and production environments
* Minimal and focused UI to reduce cognitive load
* Clear role-based navigation
* Consistent alignment and typography
* Maintainable structure

---

## Challenges and Approach

**Navigation Consistency**
Ensured stable behavior across sections and reloads

**Duplicate Resources**
Removed redundant entries to improve clarity

**State Management**
Reset UI state to avoid unintended persistence

**Deployment Reliability**
Implemented CI/CD for controlled deployment

---

## Future Enhancements

* Preview environments for development
* Enhanced validation in CI pipeline
* Improved search and filtering capabilities
* Analytics for user interaction

---

## Summary

This project demonstrates:

* Structured UI design
* Role-based user experience
* CI/CD implementation using GitHub Actions
* Controlled deployment via GitHub Pages
* A scalable and maintainable front-end architecture

---
