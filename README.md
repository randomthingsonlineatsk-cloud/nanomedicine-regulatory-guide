# Nanomedicine Regulatory Guide

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.XXXXXXX.svg)](https://doi.org/10.5281/zenodo.XXXXXXX)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18%2B-blue)](https://react.dev/)

> An interactive regulatory reference tool for nanopharmaceutical 
> development covering India (CDSCO/DBT/ICMR) and global regulatory 
> frameworks including FDA, EMA, PMDA, SAHPRA, and ANVISA.

## Overview
A complete interactive web application built in React providing 
practical guidance for nanomedicine product development, clinical 
trials, and regulatory pathway decision-making across six major 
global regulatory authorities with India as the primary focus.

## Features

### Six Interactive Tabs
- **Overview** — Executive summary, India regulatory pathway, key considerations
- **Regulators** — Searchable and filterable cards for 6 global regulators
- **Timeline** — Color-coded milestones in Indian nanomedicine regulatory history
- **Checklist** — 36 interactive items across 5 regulatory domains with progress tracking
- **CMC Dossier** — Chemistry, Manufacturing and Controls requirements with nanosimilar framework
- **About** — Author profile and linked publications with DOIs

### Regulators Covered
| Regulator | Country | Typical Timeline |
|---|---|---|
| CDSCO | India | 6–18+ months |
| FDA | USA | 12–24 months |
| EMA | European Union | 12–30 months |
| PMDA | Japan | 12–24 months |
| SAHPRA | South Africa | Variable |
| ANVISA | Brazil | Variable |

### Checklist Domains
- Quality / CMC (7 items)
- Nonclinical / Preclinical (6 items)
- Clinical Development (5 items)
- Comparability and Lifecycle (4 items)
- Regulatory Engagement (5 items)

## How to Run Locally

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm run dev
```

## How to Use in Your Project

Copy `NanomedRegulatoryApp.jsx` into your React project and import it:

```jsx
import NanomedRegulatoryApp from './NanomedRegulatoryApp';

function App() {
  return <NanomedRegulatoryApp />;
}
```

## Related Publications

| Title | DOI |
|---|---|
| Nanomedicine Regulation in India: A Comprehensive AI Framework | Zenodo Open Access |
| Role of AI in Regulatory Decision-Making | Zenodo Open Access |

## Author
Khan Gulrez Shagufa Fazal Ahmed
Independent Researcher, Maharashtra, India
MSc Bioanalytical Sciences
ORCID: 0009-0009-6195-0329

## Disclaimer
This tool is for educational and reference purposes only. Always 
consult current official guidelines from CDSCO, DBT/ICMR, FDA, EMA, 
or other relevant regulatory authorities for actual submissions. 
Regulatory requirements change frequently.

## Citation
If you use this tool in your research please cite using the 
DOI badge above after Zenodo registration.
