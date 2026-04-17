# CDNM Documentation Portal

---

## Overview

The CDNM Documentation Portal is a role-based interface designed to simplify access to Gen3 platform resources. It provides a structured and guided experience for users by organizing documentation and workflows based on their role.

---

## Objective

**Primary goals of this project:**

* Provide a clear entry point for users interacting with the Gen3 platform
* Organize resources in a role-specific and intuitive manner
* Reduce friction in accessing documentation and tools
* Establish a maintainable and deployable front-end structure

---

## Live Application

```
https://harshithayentrapragada.github.io/cdnm/
```

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

Duplicate or redundant entries were removed to improve clarity.

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

---

## CI/CD Implementation

A branch-based workflow ensures safe and controlled deployment.

### Development Environment (dev)

* Used for testing changes
* Runs validation pipeline
* Does not deploy

### Production Environment (main)

* Contains stable code
* Triggers deployment
* Updates live application

---

### Workflow

```
dev → validate → merge → main → deploy → live
```

---

## Development Process

### Develop and Test (dev)

```
git checkout dev
git add .
git commit -m "Update feature"
git push origin dev
```

### Deploy to Production (main)

```
git checkout main
git merge dev
git push origin main
```

---

## Design Considerations

* Separation of development and production environments
* Minimal and focused UI
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
* Improved validation in CI pipeline
* Advanced search and filtering
* Analytics for user interaction

---

## Summary

This project demonstrates:

* Structured UI design
* Role-based user experience
* CI/CD implementation
* Controlled deployment workflow
* Scalable front-end architecture

---
