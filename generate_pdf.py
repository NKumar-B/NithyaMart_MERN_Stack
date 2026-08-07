import os
import sys
import re
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute and render 'Page X of Y' 
    footer along with running headers on all pages except the cover page.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        page_width, page_height = letter
        
        # Cover Page (Page 1) customization
        if self._pageNumber == 1:
            # Left vertical accent stripes
            self.setFillColor(colors.HexColor('#1E3A8A')) # Deep Navy
            self.rect(0, 0, 0.35 * inch, page_height, stroke=0, fill=1)
            self.setFillColor(colors.HexColor('#3B82F6')) # Vibrant Accent Blue
            self.rect(0.35 * inch, 0, 0.08 * inch, page_height, stroke=0, fill=1)
            self.restoreState()
            return

        # Pages 2 to N: Professional Header & Footer
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor('#334155'))
        
        # Top Header
        self.drawString(45, page_height - 30, "MERN STACK TEAM 4 — MASTER ARCHITECTURAL DOCUMENTATION")
        self.setFont("Helvetica", 8)
        self.drawRightString(page_width - 45, page_height - 30, "NITHYA MART PLATFORM")
        
        self.setStrokeColor(colors.HexColor('#CBD5E1'))
        self.setLineWidth(0.75)
        self.line(45, page_height - 35, page_width - 45, page_height - 35)
        
        # Bottom Footer
        self.line(45, 40, page_width - 45, 40)
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor('#64748B'))
        self.drawString(45, 28, "Academic / Team Project Repository — Technical Reference Manual")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(page_width - 45, 28, page_str)
        self.restoreState()


def create_documentation():
    pdf_filename = "MERN_Stack_Team_4_Project_Documentation.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=45,
        rightMargin=45,
        topMargin=42,
        bottomMargin=42
    )

    styles = getSampleStyleSheet()

    # Premium Palette
    C_PRIMARY = colors.HexColor('#1E3A8A')   # Deep Navy Blue
    C_SECONDARY = colors.HexColor('#2563EB') # Bright Royal Blue
    C_TEXT = colors.HexColor('#1E293B')      # Slate Charcoal Body
    C_MUTED = colors.HexColor('#64748B')     # Muted Slate
    C_BG_LIGHT = colors.HexColor('#F8FAFC')  # Soft Light Gray Background
    C_BORDER = colors.HexColor('#E2E8F0')    # Border Gray
    C_CODE_BG = colors.HexColor('#0F172A')   # Dark Code Block Background

    # Typography Styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=C_PRIMARY,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11.5,
        leading=15,
        textColor=C_SECONDARY,
        spaceAfter=14
    )

    h1_style = ParagraphStyle(
        'Header1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13.5,
        leading=16.5,
        textColor=C_PRIMARY,
        spaceBefore=0,
        spaceAfter=5,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Header2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12.5,
        textColor=C_SECONDARY,
        spaceBefore=5,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.25,
        leading=11,
        textColor=C_TEXT,
        spaceAfter=4.5
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=body_style,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2.5
    )

    code_style = ParagraphStyle(
        'CodeSnippet',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7.25,
        leading=9.25,
        textColor=colors.HexColor('#F8FAFC'),
        spaceAfter=4
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=9.5,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.75,
        leading=9.75,
        textColor=C_TEXT
    )

    story = []

    # ==========================================
    # PAGE 1: TITLE PAGE & MASTER METADATA
    # ==========================================
    story.append(Spacer(1, 15))
    story.append(Paragraph("MERN STACK TEAM 4 WORKSPACE", ParagraphStyle('SubHeaderTag', fontName='Helvetica-Bold', fontSize=11, textColor=C_SECONDARY, leading=13, spaceAfter=4)))
    story.append(Paragraph("Consolidated Web Applications Portal & Architecture Guide", title_style))
    story.append(Paragraph("Nithya Mart Multi-Category E-Commerce & Service Ecosystem", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2.5, color=C_SECONDARY, spaceBefore=0, spaceAfter=10))

    story.append(Paragraph("Document Purpose & Abstract", h1_style))
    story.append(Paragraph(
        "This master documentation manual provides an exhaustive architectural, component, and operational breakdown of the <b>MERN Stack Team 4 Consolidated Workspace</b>. The platform consolidates 10 distinct React e-commerce and utility applications into a unified digital ecosystem under the central portal named <b>Nithya Mart</b>.",
        body_style
    ))
    story.append(Paragraph(
        "Built using React 19, Vite 8, Framer Motion 12, HTML5, and modern Vanilla CSS Design Tokens, this repository integrates luxury fashion, books, sweets, apparel rentals, fragrances, food court ordering, full-stack ice cream parlors, athletic sports gear, footwear, and event ticket booking into a cohesive multi-tenant environment.",
        body_style
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("Master Specification & Metadata Matrix", h2_style))

    meta_table_data = [
        [Paragraph("Specification Attribute", table_header_style), Paragraph("Project Implementation Details", table_header_style)],
        [Paragraph("<b>Project Title</b>", table_cell_style), Paragraph("MERN Stack Team 4 Consolidated Application Portal (Nithya Mart)", table_cell_style)],
        [Paragraph("<b>Core Web Technologies</b>", table_cell_style), Paragraph("React 19.2.7, Vite 8.1.1, JavaScript ES6+, HTML5, Vanilla CSS3", table_cell_style)],
        [Paragraph("<b>UI & Motion Engine</b>", table_cell_style), Paragraph("Framer Motion 12.43, React Icons 5.7, 3D Perspective CSS Custom Properties", table_cell_style)],
        [Paragraph("<b>Utilities & HTTP Services</b>", table_cell_style), Paragraph("Axios 1.18, React QR Code 2.2, React Router DOM 7.18", table_cell_style)],
        [Paragraph("<b>Backend Engine (IceCreams)</b>", table_cell_style), Paragraph("Node.js, Express REST API, CORS Middleware, JSON API controllers", table_cell_style)],
        [Paragraph("<b>Repository Architecture</b>", table_cell_style), Paragraph("Multi-Application Git Subtree Monorepo with Sandboxed Iframe Viewports", table_cell_style)],
        [Paragraph("<b>Integrated Submodule Count</b>", table_cell_style), Paragraph("10 Self-Contained E-Commerce & Service Web Applications", table_cell_style)],
        [Paragraph("<b>Local Repository Root</b>", table_cell_style), Paragraph("`c:\\Nithin_Academic\\MERN_Stack_Team_4`", table_cell_style)]
    ]

    t_meta = Table(meta_table_data, colWidths=[2.0*inch, 4.7*inch])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), C_PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
    ]))
    story.append(t_meta)

    story.append(Spacer(1, 6))
    story.append(Paragraph("Document Structure Index (Pages 1–16)", h2_style))
    story.append(Paragraph("• <b>Page 1:</b> Master Metadata & Document Purpose | <b>Page 2:</b> Executive Summary & Vision | <b>Page 3:</b> Subtree Architecture Strategy", bullet_style))
    story.append(Paragraph("• <b>Page 4:</b> Central Portal Hub (`src/App.jsx`) | <b>Page 5:</b> BAG Luxury Module | <b>Page 6:</b> BOOK Store Module", bullet_style))
    story.append(Paragraph("• <b>Page 7:</b> CHOCOLATES Boutique | <b>Page 8:</b> COSTUMES Rental Store | <b>Page 9:</b> FRAGRANCE Depot Module", bullet_style))
    story.append(Paragraph("• <b>Page 10:</b> BiteCourt FOOD Ordering | <b>Page 11:</b> Full-Stack ICECREAMS Parlour | <b>Page 12:</b> SPORTS Goods Store", bullet_style))
    story.append(Paragraph("• <b>Page 13:</b> SHOES Footwear Emporium | <b>Page 14:</b> TICKET BOOKING & Spiderman Showcase | <b>Page 15:</b> Technical Deep Dive", bullet_style))
    story.append(Paragraph("• <b>Page 16:</b> Developer Operations, Setup Guide & Strategic Roadmap", bullet_style))

    story.append(PageBreak())

    # ==========================================
    # PAGE 2: EXECUTIVE SUMMARY & PROJECT PURPOSE
    # ==========================================
    story.append(Paragraph("Executive Summary & Strategic Vision", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Background & Academic Context", h2_style))
    story.append(Paragraph(
        "In modern web development, team projects often face the challenge of merging disparate software modules built by independent developers. Traditional merging techniques frequently result in broken dependencies, overwritten styling rules, and lost commit histories. To solve these engineering challenges, <b>MERN Stack Team 4</b> designed a consolidated web portal that aggregates 10 distinct, fully autonomous sub-applications into a single production workspace.",
        body_style
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Strategic Platform Objectives", h2_style))
    story.append(Paragraph("• <b>Centralized Multi-Tenant Aggregation:</b> Provide a unified entry point (Nithya Mart) that allows users to launch 10 independent e-commerce and utility platforms without page reloads.", bullet_style))
    story.append(Paragraph("• <b>Complete Autonomy for Submodules:</b> Ensure that each project folder maintains its own isolated `package.json`, asset directory, and routing logic without polluting sibling modules.", bullet_style))
    story.append(Paragraph("• <b>Preservation of Commit Histories:</b> Use Git Subtree strategies to merge developer branches, preserving full attribution and commit logs across all team members.", bullet_style))
    story.append(Paragraph("• <b>Modern Motion UI Design:</b> Deliver a state-of-the-art user interface featuring 3D hover perspective tilt, glassmorphism cards, dynamic dark mode context, and interactive canvas orbital mechanics.", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Consolidated Submodule Portfolio", h2_style))

    port_table_data = [
        [Paragraph("Module", table_header_style), Paragraph("Category", table_header_style), Paragraph("Core Business Domain & Operational Role", table_header_style)],
        [Paragraph("<b>BAG</b>", table_cell_style), Paragraph("Shopping", table_cell_style), Paragraph("Luxury Handbags, Office Briefcases, Travel Duffels & Accessories", table_cell_style)],
        [Paragraph("<b>BOOK</b>", table_cell_style), Paragraph("Education", table_cell_style), Paragraph("Academic Textbooks, Bestseller Novels, Science & Genre Catalog", table_cell_style)],
        [Paragraph("<b>CHOCOLATES</b>", table_cell_style), Paragraph("Food & Sweets", table_cell_style), Paragraph("Imported Confections, Cocoa Truffles, Custom Gift Box Creator", table_cell_style)],
        [Paragraph("<b>COSTUMES</b>", table_cell_style), Paragraph("Apparel", table_cell_style), Paragraph("Theater Costumes, Party Wear & Halloween Rental Calculation System", table_cell_style)],
        [Paragraph("<b>FRAGRANCE</b>", table_cell_style), Paragraph("Beauty", table_cell_style), Paragraph("Luxury Perfumes, Colognes, Scent Profiling & Aromatics Depot", table_cell_style)],
        [Paragraph("<b>Foood</b>", table_cell_style), Paragraph("Food Court", table_cell_style), Paragraph("BiteCourt Fast Food Ordering, Combos, Platters & Custom Hook Cart", table_cell_style)],
        [Paragraph("<b>IceCreams</b>", table_cell_style), Paragraph("Desserts", table_cell_style), Paragraph("Full-Stack Express REST API + React Client Sundae Builder", table_cell_style)],
        [Paragraph("<b>SPORTS</b>", table_cell_style), Paragraph("Fitness", table_cell_style), Paragraph("Athletic Gear, Sports Equipment, Jerseys & Specification Modals", table_cell_style)],
        [Paragraph("<b>Shoes</b>", table_cell_style), Paragraph("Apparel", table_cell_style), Paragraph("Sneaker Emporium, Footwear Catalog & UK/US Size Matrix Selector", table_cell_style)],
        [Paragraph("<b>TICKETBOOKING</b>", table_cell_style), Paragraph("Entertainment", table_cell_style), Paragraph("Cinema Seat Selector, QR Code Digital Pass & Spiderman Showcase", table_cell_style)]
    ]

    t_port = Table(port_table_data, colWidths=[1.1*inch, 1.1*inch, 4.5*inch])
    t_port.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), C_PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_port)

    story.append(PageBreak())

    # ==========================================
    # PAGE 3: SUBTREE ARCHITECTURE STRATEGY
    # ==========================================
    story.append(Paragraph("System Architecture & Git Subtree Mechanics", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Monorepo vs Git Subtree Architectural Analysis", h2_style))
    story.append(Paragraph(
        "When designing multi-project repositories, developers choose between standard monorepos (Lerna/Nx), Git Submodules, and Git Subtrees. The table below details why **Git Subtrees** were selected for this workspace:",
        body_style
    ))

    strat_comp_data = [
        [Paragraph("Integration Criteria", table_header_style), Paragraph("Git Submodules", table_header_style), Paragraph("Git Subtree Strategy (Chosen)", table_header_style)],
        [Paragraph("<b>Cloning Complexity</b>", table_cell_style), Paragraph("High (Requires recursive init commands)", table_cell_style), Paragraph("<b>Zero</b> (Standard `git clone` fetches all code)", table_cell_style)],
        [Paragraph("<b>Commit History</b>", table_cell_style), Paragraph("Pointers only; history stored remotely", table_cell_style), Paragraph("<b>Full Log Preserved</b> directly in master branch", table_cell_style)],
        [Paragraph("<b>Directory Autonomy</b>", table_cell_style), Paragraph("High, but prone to pointer mismatch", table_cell_style), Paragraph("<b>Total Autonomy</b> with folder-level isolation", table_cell_style)],
        [Paragraph("<b>Developer Overhead</b>", table_cell_style), Paragraph("Requires complex nested git commands", table_cell_style), Paragraph("<b>Seamless</b> standard workflow for developers", table_cell_style)]
    ]
    t_strat = Table(strat_comp_data, colWidths=[1.5*inch, 2.3*inch, 2.9*inch])
    t_strat.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), C_PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 3.5),
    ]))
    story.append(t_strat)

    story.append(Spacer(1, 6))
    story.append(Paragraph("2. Repository Architecture & Component Flow Diagram", h2_style))

    arch_box_data = [
        [Paragraph("<b>CENTRAL NITHYA MART PORTAL ENTRY POINT (`/src/App.jsx`)</b><br/>Global Nav Header | Orbital Canvas Navigation | Dark Mode Engine | Viewport Iframe Controller", ParagraphStyle('DiagH', fontName='Helvetica-Bold', fontSize=8.5, textColor=colors.white, alignment=1))],
        [Paragraph("<b>DYNAMIC VIEWPORT ROUTING LAYER (Iframe Isolation Sandboxing)</b>", ParagraphStyle('DiagS', fontName='Helvetica-Bold', fontSize=7.5, textColor=C_PRIMARY, alignment=1))],
        [Paragraph(
            "<b>📂 /BAG/index.html</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>📂 /BOOK/index.html</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>📂 /CHOCOLATES/index.html</b><br/>"
            "<b>📂 /COSTUMES/index.html</b> &nbsp;&nbsp; <b>📂 /FRAGRANCE/index.html</b> &nbsp;&nbsp; <b>📂 /Foood/Foood/index.html</b><br/>"
            "<b>📂 /IceCreams/client/index.html</b> &nbsp;&nbsp; <b>📂 /SPORTS/index.html</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>📂 /Shoes/index.html</b><br/>"
            "<b>📂 /TICKETBOOKING/index.html</b>",
            ParagraphStyle('DiagB', fontName='Helvetica', fontSize=7.5, textColor=C_TEXT, alignment=1, leading=10.5)
        )]
    ]
    t_arch_box = Table(arch_box_data, colWidths=[6.7*inch])
    t_arch_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), C_PRIMARY),
        ('BACKGROUND', (0, 1), (-1, 1), C_BORDER),
        ('BACKGROUND', (0, 2), (-1, 2), C_BG_LIGHT),
        ('GRID', (0, 0), (-1, -1), 0.75, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_arch_box)

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Git Subtree Add Command Execution Reference", h2_style))
    story.append(Paragraph("Each team module branch was integrated using subtree prefixes as shown below:", body_style))

    code_sub_ref = """# Subtree Integration Command Pattern:
# git subtree add --prefix=<FOLDER_NAME> origin/<BRANCH_NAME>

git subtree add --prefix=BAG origin feature/bag-store
git subtree add --prefix=BOOK origin feature/book-store
git subtree add --prefix=TICKETBOOKING origin feature/ticket-booking"""
    t_code_sub_ref = Table([[Paragraph(f"<pre>{code_sub_ref}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_sub_ref.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_sub_ref)

    story.append(PageBreak())

    # ==========================================
    # PAGE 4: CENTRAL HUB ENGINE (src/App.jsx)
    # ==========================================
    story.append(Paragraph("Central Portal & Hub Engine (`src/App.jsx`)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Central Hub Functional Architecture", h2_style))
    story.append(Paragraph(
        "The file `src/App.jsx` serves as the central administrative cockpit of the workspace. Implemented with React 19, Framer Motion 12, and pure CSS custom properties, it manages global state, active project viewports, automated banner carousels, dark/light theme switching, and interactive orbital navigation maps.",
        body_style
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Key Portal Sub-Systems & Technical Implementation", h2_style))
    story.append(Paragraph("• <b>Interactive Orbital Universe Map:</b> A physics-inspired CSS module rendering a central core hub surrounded by concentric orbits (`orbit-track-1`, `orbit-track-2`, `orbit-track-3`) and orbiting module planets (`planet-bag`, `planet-book`, `planet-food`, `planet-sports`). Hovering pauses planet rotation and triggers a glassmorphism info tooltip.", bullet_style))
    story.append(Paragraph("• <b>3D Perspective Card Tilt:</b> Dynamic mouse position calculation updating `--x` and `--y` CSS custom variables per card on hover, creating interactive 3D perspective transforms.", bullet_style))
    story.append(Paragraph("• <b>60 FPS Cursor Spotlight:</b> Real-time cursor position tracking updating `--mouse-x` and `--mouse-y` DOM root properties directly without triggering React virtual DOM re-renders.", bullet_style))
    story.append(Paragraph("• <b>Framer Motion Auto Carousel:</b> Animated hero showcase rotating featured collections (Luxury Bags, Chocolates, BiteCourt Food) with exit/enter transitions via `AnimatePresence`.", bullet_style))
    story.append(Paragraph("• <b>Iframe Viewport Manager:</b> Sandboxed viewport rendering sub-application entry points (`/BAG/index.html`) with loading overlay spinners (`setIframeLoading`).", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Portal Project Registry Data Schema", h2_style))

    reg_schema_data = [
        [Paragraph("Module ID", table_header_style), Paragraph("Display Name", table_header_style), Paragraph("Target Path", table_header_style), Paragraph("Theme Class", table_header_style)],
        [Paragraph("`bag`", table_cell_style), Paragraph("BAG E-Commerce", table_cell_style), Paragraph("`/BAG/index.html`", table_cell_style), Paragraph("`theme-bag`", table_cell_style)],
        [Paragraph("`book`", table_cell_style), Paragraph("BOOK Store", table_cell_style), Paragraph("`/BOOK/index.html`", table_cell_style), Paragraph("`theme-book`", table_cell_style)],
        [Paragraph("`chocolates`", table_cell_style), Paragraph("CHOCOLATES Shop", table_cell_style), Paragraph("`/CHOCOLATES/index.html`", table_cell_style), Paragraph("`theme-chocolate`", table_cell_style)],
        [Paragraph("`costumes`", table_cell_style), Paragraph("COSTUMES Store", table_cell_style), Paragraph("`/COSTUMES/index.html`", table_cell_style), Paragraph("`theme-costume`", table_cell_style)],
        [Paragraph("`fragrance`", table_cell_style), Paragraph("FRAGRANCE Depot", table_cell_style), Paragraph("`/FRAGRANCE/index.html`", table_cell_style), Paragraph("`theme-fragrance`", table_cell_style)],
        [Paragraph("`food`", table_cell_style), Paragraph("BiteCourt FOOD", table_cell_style), Paragraph("`/Foood/Foood/index.html`", table_cell_style), Paragraph("`theme-food`", table_cell_style)],
        [Paragraph("`icecream`", table_cell_style), Paragraph("ICECREAMS Parlour", table_cell_style), Paragraph("`/IceCreams/client/index.html`", table_cell_style), Paragraph("`theme-icecream`", table_cell_style)],
        [Paragraph("`sports`", table_cell_style), Paragraph("SPORTS Goods", table_cell_style), Paragraph("`/SPORTS/index.html`", table_cell_style), Paragraph("`theme-sport`", table_cell_style)],
        [Paragraph("`shoes`", table_cell_style), Paragraph("SHOES Emporium", table_cell_style), Paragraph("`/Shoes/index.html`", table_cell_style), Paragraph("`theme-shoe`", table_cell_style)],
        [Paragraph("`ticketbooking`", table_cell_style), Paragraph("TICKET BOOKING", table_cell_style), Paragraph("`/TICKETBOOKING/index.html`", table_cell_style), Paragraph("`theme-ticket`", table_cell_style)]
    ]

    t_reg_s = Table(reg_schema_data, colWidths=[1.1*inch, 2.2*inch, 2.0*inch, 1.4*inch])
    t_reg_s.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), C_PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_reg_s)

    story.append(Spacer(1, 6))
    story.append(Paragraph("4. Code Highlights — 3D Tilt & Mouse Spotlight Handler", h2_style))

    code_spot = """// App.jsx - Real-time 60 FPS Cursor Tracking & 3D Tilt
useEffect(() => {
  const handleGlobalMouseMove = (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  };
  window.addEventListener('mousemove', handleGlobalMouseMove);
  return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
}, []);"""
    t_code_spot = Table([[Paragraph(f"<pre>{code_spot}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_spot.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_spot)

    story.append(PageBreak())

    # ==========================================
    # PAGE 5: SUBMODULE 1 — BAG LUXURY E-COMMERCE
    # ==========================================
    story.append(Paragraph("Submodule 1: BAG Luxury E-Commerce (`/BAG`)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Module Overview & Domain Scope", h2_style))
    story.append(Paragraph(
        "The **BAG E-Commerce Module** is a luxury handbag and accessories store module. It features high-resolution catalog displays, category filtration (Luxury Handbags, Professional Office Briefcases, Travel Duffel Bags, Leather Backpacks), price sliders, and persistent shopping cart management.",
        body_style
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2. File Architecture & Directory Breakdown", h2_style))

    bag_files_data = [
        [Paragraph("File Path", table_header_style), Paragraph("Component Role & Description", table_header_style)],
        [Paragraph("`BAG/src/App.jsx`", table_cell_style), Paragraph("Main router & layout wrapper integrating header navigation and page views", table_cell_style)],
        [Paragraph("`BAG/src/context/CartContext.jsx`", table_cell_style), Paragraph("React Context managing cart items array, item additions, quantity updates, and subtotal calculation", table_cell_style)],
        [Paragraph("`BAG/src/pages/Home.jsx`", table_cell_style), Paragraph("Landing hero page featuring luxury bag promos and category shortcuts", table_cell_style)],
        [Paragraph("`BAG/src/pages/Products.jsx`", table_cell_style), Paragraph("Product grid view with search query input, category pills, and price slider filter", table_cell_style)],
        [Paragraph("`BAG/src/pages/ProductDetails.jsx`", table_cell_style), Paragraph("Individual product detail view with image gallery, specs list, and Add to Cart action", table_cell_style)],
        [Paragraph("`BAG/src/styles/App.css`", table_cell_style), Paragraph("Custom styling rules, card glassmorphic hover animations, and responsive layout grids", table_cell_style)]
    ]
    t_bag_f = Table(bag_files_data, colWidths=[2.2*inch, 4.5*inch])
    t_bag_f.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), C_SECONDARY),
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 3.5),
    ]))
    story.append(t_bag_f)

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Technical Features & UI Capabilities", h2_style))
    story.append(Paragraph("• <b>Dynamic Price Slider:</b> Interactive range filter narrowing product view dynamically between $50 and $1,500.", bullet_style))
    story.append(Paragraph("• <b>Cart Badge Counter:</b> Real-time header badge reflecting total aggregated items in cart.", bullet_style))
    story.append(Paragraph("• <b>Responsive Asset Pipeline:</b> High-density image gallery under `src/assets/categories/` (`luxury-handbags.jpg`).", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("4. Code Highlights — Cart Context Provider Pattern (`CartContext.jsx`)", h2_style))

    code_bag = """// BAG/src/context/CartContext.jsx - Cart Management Context
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const getSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return <CartContext.Provider value={{ cart, addToCart, getSubtotal }}>{children}</CartContext.Provider>;
};"""
    t_code_bag = Table([[Paragraph(f"<pre>{code_bag}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_bag.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_bag)

    story.append(PageBreak())

    # ==========================================
    # PAGE 6: SUBMODULE 2 — BOOK STORE PORTAL
    # ==========================================
    story.append(Paragraph("Submodule 2: BOOK Store Portal (`/BOOK`)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Module Purpose & Academic Scope", h2_style))
    story.append(Paragraph(
        "The **BOOK Store Module** is a modern online bookstore portal providing rapid catalog browsing, instant title/author search indexing, genre filtering (Fiction, Technology, Science, History, Fantasy), textbook recommendations, and order checkout simulation.",
        body_style
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Component Hierarchy & File Structure", h2_style))

    book_files_data = [
        [Paragraph("File Path", table_header_style), Paragraph("Component Role & Functionality", table_header_style)],
        [Paragraph("`BOOK/src/App.jsx`", table_cell_style), Paragraph("Root component establishing Context providers, routing views, and main layout container", table_cell_style)],
        [Paragraph("`BOOK/src/context/BookContext.jsx`", table_cell_style), Paragraph("Global inventory context storing book items, active search query, and cart list", table_cell_style)],
        [Paragraph("`BOOK/src/components/Navbar.jsx`", table_cell_style), Paragraph("Navigation header with logo, genre links, search bar input, and cart drawer toggle button", table_cell_style)],
        [Paragraph("`BOOK/src/components/BookCard.jsx`", table_cell_style), Paragraph("Book card rendering cover thumbnail, rating stars, price, author, and Quick Add button", table_cell_style)],
        [Paragraph("`BOOK/src/components/CartModal.jsx`", table_cell_style), Paragraph("Slide-out modal displaying order itemization, subtotal, tax calculation, and Checkout trigger", table_cell_style)],
        [Paragraph("`BOOK/src/App.css`", table_cell_style), Paragraph("Grid layouts, typography styling, search highlighting, and cart transition animations", table_cell_style)]
    ]
    t_book_f = Table(book_files_data, colWidths=[2.2*inch, 4.5*inch])
    t_book_f.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), C_PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 3.5),
    ]))
    story.append(t_book_f)

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Technical Features & Search Indexing", h2_style))
    story.append(Paragraph("• <b>Real-Time Search Indexer:</b> Filters book listings dynamically as the user types into the navbar search input, checking both title and author strings.", bullet_style))
    story.append(Paragraph("• <b>Genre Filter Pills:</b> Interactive category buttons allowing instant genre isolation.", bullet_style))
    story.append(Paragraph("• <b>Tax & Shipping Estimator:</b> Calculates 8% estimated sales tax and shipping cost automatically in the cart drawer.", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("4. Code Highlights — Real-Time Search Filtering Logic (`BookContext.jsx`)", h2_style))

    code_book = """// BOOK/src/context/BookContext.jsx - Search & Genre Filtering Engine
const getFilteredBooks = () => {
  return books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = activeGenre === 'All' || book.genre === activeGenre;
    return matchesSearch && matchesGenre;
  });
};"""
    t_code_book = Table([[Paragraph(f"<pre>{code_book}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_book.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_book)

    story.append(PageBreak())

    # ==========================================
    # PAGE 7: SUBMODULE 3 — CHOCOLATES BOUTIQUE
    # ==========================================
    story.append(Paragraph("Submodule 3: CHOCOLATES Boutique (`/CHOCOLATES`)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Module Overview & Product Domain", h2_style))
    story.append(Paragraph(
        "The **CHOCOLATES Shop Module** is an artisanal confection boutique platform highlighting imported Belgian truffles, dark cocoa slabs (70% - 90%), festive sweet assortments, and a custom **Gift Box Builder** that enables customers to assemble customized confection boxes.",
        body_style
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2. File Architecture & Data Layer", h2_style))

    choc_files_data = [
        [Paragraph("File Path", table_header_style), Paragraph("Component Role & Description", table_header_style)],
        [Paragraph("`CHOCOLATES/src/App.jsx`", table_cell_style), Paragraph("Main entry point configuring hero banner, product grid, and custom gift box modal", table_cell_style)],
        [Paragraph("`CHOCOLATES/src/data/chocolateData.js`", table_cell_style), Paragraph("Structured JSON dataset containing items, cocoa percentage, origin country, and pricing", table_cell_style)],
        [Paragraph("`CHOCOLATES/src/components/ChocolateGrid.jsx`", table_cell_style), Paragraph("Grid component displaying confectionery items with cocoa badge and Add to Box action", table_cell_style)],
        [Paragraph("`CHOCOLATES/src/components/BoxBuilder.jsx`", table_cell_style), Paragraph("Interactive custom gift box configurator (select 4, 8, or 12 custom chocolate pieces)", table_cell_style)],
        [Paragraph("`CHOCOLATES/src/context/CartContext.jsx`", table_cell_style), Paragraph("Cart state management with custom gift note input field persistence", table_cell_style)],
        [Paragraph("`CHOCOLATES/src/styles/App.css`", table_cell_style), Paragraph("Warm chocolate amber palette styling, custom box visualizer, and checkout draw styles", table_cell_style)]
    ]
    t_choc_f = Table(choc_files_data, colWidths=[2.2*inch, 4.5*inch])
    t_choc_f.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#92400E')), # Warm Amber/Chocolate
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 3.5),
    ]))
    story.append(t_choc_f)

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Technical Features & Custom Box Builder", h2_style))
    story.append(Paragraph("• <b>Custom Box Builder Component:</b> Allows users to pick box size (Small: 4 pieces, Large: 12 pieces) and select individual truffle flavors.", bullet_style))
    story.append(Paragraph("• <b>Gift Message Attachment:</b> Textarea input attached directly to the order object for customized gift deliveries.", bullet_style))
    story.append(Paragraph("• <b>Cocoa Content Filtering:</b> Filter truffles by cocoa intensity (Milk, 50% Dark, 70% Dark, 90% Extra Dark).", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("4. Code Highlights — Custom Gift Box Builder Logic (`BoxBuilder.jsx`)", h2_style))

    code_choc = """// CHOCOLATES/src/components/BoxBuilder.jsx - Custom Gift Box Selection Logic
const addTruffleToBox = (truffle) => {
  if (selectedPieces.length >= maxBoxCapacity) {
    alert(`Box is full! Maximum capacity is ${maxBoxCapacity} pieces.`);
    return;
  }
  setSelectedPieces(prev => [...prev, truffle]);
};

const calculateBoxPrice = () => {
  const baseBoxFee = maxBoxCapacity === 12 ? 8.00 : 4.00;
  const piecesCost = selectedPieces.reduce((sum, item) => sum + item.price, 0);
  return baseBoxFee + piecesCost;
};"""
    t_code_choc = Table([[Paragraph(f"<pre>{code_choc}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_choc.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_choc)

    story.append(PageBreak())

    # ==========================================
    # PAGE 8: SUBMODULE 4 — COSTUMES RENTAL STORE
    # ==========================================
    story.append(Paragraph("Submodule 4: COSTUMES Store & Rentals (`/COSTUMES`)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Module Overview & Business Model", h2_style))
    story.append(Paragraph(
        "The **COSTUMES Store Module** is a specialized retail and rental portal catering to theater productions, Halloween parties, cosplay conventions, and festival events. It provides both direct purchasing and daily rental options complete with deposit calculation and size measurement guides.",
        body_style
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Architecture & File Breakdown", h2_style))

    cost_files_data = [
        [Paragraph("File Path", table_header_style), Paragraph("Component Role & Description", table_header_style)],
        [Paragraph("`COSTUMES/src/App.jsx`", table_cell_style), Paragraph("Monolithic state engine (17.2 KB) managing rental date pickers, size selectors, and cart drawer", table_cell_style)],
        [Paragraph("`COSTUMES/src/App.css`", table_cell_style), Paragraph("Comprehensive stylesheet (16.6 KB) with theatrical dark theme tokens, size charts, and rental modals", table_cell_style)],
        [Paragraph("`COSTUMES/src/main.jsx`", table_cell_style), Paragraph("Root entry mounting React DOM tree to `#root` element", table_cell_style)]
    ]
    t_cost_f = Table(cost_files_data, colWidths=[2.2*inch, 4.5*inch])
    t_cost_f.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#6B21A8')), # Deep Costume Purple
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_cost_f)

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Technical Features & Rental Duration Calculation", h2_style))
    story.append(Paragraph("• <b>Dual Transaction Model:</b> Toggle between 'Buy Outright' and 'Rent per Day' for each costume item.", bullet_style))
    story.append(Paragraph("• <b>Rental Date Range Estimator:</b> Calculates total rental duration in days from start/end date inputs and automatically adds a 50% refundable security deposit.", bullet_style))
    story.append(Paragraph("• <b>Interactive Size Matrix:</b> Size selector pills (XS, S, M, L, XL, Custom) displaying exact chest and waist measurement guidelines on hover.", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("4. Code Highlights — Rental Fee & Deposit Calculator (`App.jsx`)", h2_style))

    code_cost = """// COSTUMES/src/App.jsx - Rental Fee & Security Deposit Estimator
const computeRentalQuote = (dailyRate, startIsoDate, endIsoDate) => {
  const start = new Date(startIsoDate);
  const end = new Date(endIsoDate);
  const diffMilliseconds = Math.max(0, end - start);
  const totalDays = Math.max(1, Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24)));
  
  const rentalTotal = dailyRate * totalDays;
  const refundableDeposit = dailyRate * 0.5;
  const grandTotal = rentalTotal + refundableDeposit;

  return { totalDays, rentalTotal, refundableDeposit, grandTotal };
};"""
    t_code_cost = Table([[Paragraph(f"<pre>{code_cost}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_cost.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_cost)

    story.append(PageBreak())

    # ==========================================
    # PAGE 9: SUBMODULE 5 — FRAGRANCE DEPOT
    # ==========================================
    story.append(Paragraph("Submodule 5: FRAGRANCE Depot (`/FRAGRANCE`)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Module Overview & Luxury Catalog Domain", h2_style))
    story.append(Paragraph(
        "The **FRAGRANCE Depot Module** is a luxury cosmetics storefront showcasing designer perfumes, eau de parfum, colognes, luxury scented candles, and aromatherapy essential oils. It features scent family categorization and dynamic volume bottle pricing.",
        body_style
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Component Hierarchy & File Structure", h2_style))

    frag_files_data = [
        [Paragraph("File Path", table_header_style), Paragraph("Component Role & Description", table_header_style)],
        [Paragraph("`FRAGRANCE/src/App.jsx`", table_cell_style), Paragraph("Main application engine (8.3 KB) managing scent category state, modal displays, and cart items", table_cell_style)],
        [Paragraph("`FRAGRANCE/src/components/Header.jsx`", table_cell_style), Paragraph("Header bar featuring luxury brand logo, scent notes filter pills, and cart counter", table_cell_style)],
        [Paragraph("`FRAGRANCE/src/components/ProductList.jsx`", table_cell_style), Paragraph("Catalog list displaying fragrance bottles, scent notes tags, volume selectors, and Add button", table_cell_style)],
        [Paragraph("`FRAGRANCE/src/App.css`", table_cell_style), Paragraph("Luxury rose-gold and deep charcoal stylesheet (5.9 KB) styling bottle cards and cart drawer", table_cell_style)]
    ]
    t_frag_f = Table(frag_files_data, colWidths=[2.2*inch, 4.5*inch])
    t_frag_f.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#BE185D')), # Pink Rose Accent
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_frag_f)

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Technical Features & Scent Profiling", h2_style))
    story.append(Paragraph("• <b>Scent Profile Tags:</b> Categorizes items by scent notes: Floral, Woody, Oriental, Citrus, Fresh, and Aquatic.", bullet_style))
    story.append(Paragraph("• <b>Volume Selector Engine:</b> Interactive size pills (30ml, 50ml, 100ml) adjusting price dynamically per volume.", bullet_style))
    story.append(Paragraph("• <b>Fragrance Concentration Indicators:</b> Badges indicating Concentration levels (Eau de Toilette vs Eau de Parfum vs Pure Parfum Extract).", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("4. Code Highlights — Bottle Size Volume & Price Adjuster (`App.jsx`)", h2_style))

    code_frag = """// FRAGRANCE/src/App.jsx - Bottle Size Price Multiplier Logic
const getAdjustedPrice = (basePrice, volumeMl) => {
  switch (volumeMl) {
    case 30: return basePrice;
    case 50: return Math.round(basePrice * 1.45);
    case 100: return Math.round(basePrice * 2.20);
    default: return basePrice;
  }
};"""
    t_code_frag = Table([[Paragraph(f"<pre>{code_frag}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_frag.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_frag)

    story.append(PageBreak())

    # ==========================================
    # PAGE 10: SUBMODULE 6 — BiteCourt FOOD ORDERING
    # ==========================================
    story.append(Paragraph("Submodule 6: BiteCourt FOOD Ordering (`/Foood/Foood`)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Module Purpose & Architecture", h2_style))
    story.append(Paragraph(
        "The **BiteCourt FOOD Ordering Module** is a food court ordering application offering fast food items, burgers, french fries, beverages, combo platters, and quick checkout. Built with a modular React architecture, it uses custom hooks and service layers.",
        body_style
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Modular Layer Breakdown & Directory Blueprint", h2_style))

    food_files_data = [
        [Paragraph("Directory Path", table_header_style), Paragraph("Architectural Layer & Description", table_header_style)],
        [Paragraph("`Foood/Foood/src/App.jsx`", table_cell_style), Paragraph("Main router & layout wrapper integrating header, sidebar menu, and cart drawer", table_cell_style)],
        [Paragraph("`Foood/Foood/src/services/api.js`", table_cell_style), Paragraph("API service abstraction handling food menu fetching and order posting", table_cell_style)],
        [Paragraph("`Foood/Foood/src/hooks/useCart.js`", table_cell_style), Paragraph("Custom React hook encapsulating food cart context actions and calculations", table_cell_style)],
        [Paragraph("`Foood/Foood/src/context/FoodContext.jsx`", table_cell_style), Paragraph("Context provider managing cart items, meal add-ons, and promo discounts", table_cell_style)],
        [Paragraph("`Foood/Foood/src/layouts/`", table_cell_style), Paragraph("Layout components structuring food grid, sidebar categories, and checkout bar", table_cell_style)],
        [Paragraph("`Foood/Foood/src/assets/`", table_cell_style), Paragraph("High-quality food imagery asset folder (`french-fries.jpeg`)", table_cell_style)]
    ]
    t_food_f = Table(food_files_data, colWidths=[2.2*inch, 4.5*inch])
    t_food_f.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#B45309')), # Warm Amber/Food
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 3.5),
    ]))
    story.append(t_food_f)

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Technical Features & Meal Customization", h2_style))
    story.append(Paragraph("• <b>Combo Add-On Configurator:</b> Allows users to customize meals (Extra Cheese, Spicy Sauce, Large Drink).", bullet_style))
    story.append(Paragraph("• <b>Promo Code Validator:</b> Validates discount coupon codes (e.g. `BITENOW10` for 10% off).", bullet_style))
    story.append(Paragraph("• <b>Delivery Tip Selector:</b> Options for driver tip selection ($2, $3, $5, Custom).", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("4. Code Highlights — Custom Hook Pattern (`useCart.js`)", h2_style))

    code_food_hook = """// Foood/Foood/src/hooks/useCart.js - Custom Hook pattern for cart management
import { useContext } from 'react';
import { FoodContext } from '../context/FoodContext';

export const useCart = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useCart must be executed within a FoodContextProvider wrapper');
  }
  return context;
};"""
    t_code_food_h = Table([[Paragraph(f"<pre>{code_food_hook}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_food_h.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_food_h)

    story.append(PageBreak())

    # ==========================================
    # PAGE 11: SUBMODULE 7 — ICECREAMS PARLOUR
    # ==========================================
    story.append(Paragraph("Submodule 7: ICECREAMS Parlour Full-Stack (`/IceCreams`)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Full-Stack System Architecture Overview", h2_style))
    story.append(Paragraph(
        "The **ICECREAMS Parlour Module** is a full-stack web application featuring an Express REST API backend (`/IceCreams/server`) and a React client frontend (`/IceCreams/client`). It provides custom sundae building, topping selections, and order status tracking.",
        body_style
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Client-Server Directory & API Endpoint Blueprint", h2_style))

    ice_files_data = [
        [Paragraph("Path / Endpoint", table_header_style), Paragraph("Role & API Specification", table_header_style)],
        [Paragraph("`IceCreams/client/`", table_cell_style), Paragraph("Vite + React frontend UI for custom ice cream scoop & topping customization", table_cell_style)],
        [Paragraph("`IceCreams/server/`", table_cell_style), Paragraph("Express Node server exposing REST API endpoints for ice cream menu & order persistence", table_cell_style)],
        [Paragraph("`GET /api/flavors`", table_cell_style), Paragraph("Returns JSON array of available ice cream flavors (Vanilla, Chocolate, Mint, Strawberry, Mango)", table_cell_style)],
        [Paragraph("`GET /api/toppings`", table_cell_style), Paragraph("Returns JSON array of toppings (Choco Chips, Rainbow Sprinkles, Hot Fudge, Nuts)", table_cell_style)],
        [Paragraph("`POST /api/orders`", table_cell_style), Paragraph("Accepts order payload, stores order in memory database, returns created order with status 'Preparing'", table_cell_style)]
    ]
    t_ice_f = Table(ice_files_data, colWidths=[2.2*inch, 4.5*inch])
    t_ice_f.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0284C7')), # Ice Blue Accent
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 3.5),
    ]))
    story.append(t_ice_f)

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Technical Features & Custom Sundae Builder", h2_style))
    story.append(Paragraph("• <b>Interactive Sundae Configurator:</b> Select scoop count (1, 2, 3 scoops), container type (Waffle Cone, Sugar Cone, Tub), and multiple topping drizzles.", bullet_style))
    story.append(Paragraph("• <b>Order Lifecycle Tracker:</b> Status badge transitioning dynamically: Received -> Preparing -> Ready for Pickup.", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("4. Code Highlights — Express REST API Order Controller (`server/index.js`)", h2_style))

    code_express_server = """// IceCreams/server/index.js - Express API Controller
const express = require('express');
const app = express();
app.use(express.json());

const orders = [];

app.post('/api/orders', (req, res) => {
  const { customerName, flavor, scoops, container, toppings, totalAmount } = req.body;
  if (!customerName || !flavor) return res.status(400).json({ error: 'Missing order fields' });
  
  const newOrder = {
    id: `ICE-${Date.now()}`, customerName, flavor, scoops, container, toppings, totalAmount, status: 'Preparing'
  };
  orders.push(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});"""
    t_code_exp_s = Table([[Paragraph(f"<pre>{code_express_server}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_exp_s.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_exp_s)

    story.append(PageBreak())

    # ==========================================
    # PAGE 12: SUBMODULE 8 — SPORTS GOODS STORE
    # ==========================================
    story.append(Paragraph("Submodule 8: SPORTS Goods & Fitness (`/SPORTS`)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Module Purpose & Sports Domain", h2_style))
    story.append(Paragraph(
        "The **SPORTS Goods Module** is an athletic equipment, activewear, and workout gear catalog. It covers gear for football, basketball, cricket, tennis, fitness gym equipment, protective pads, and workout accessories.",
        body_style
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2. File Blueprint & Component Structure", h2_style))

    sports_files_data = [
        [Paragraph("File Path", table_header_style), Paragraph("Component Role & Description", table_header_style)],
        [Paragraph("`SPORTS/src/App.jsx`", table_cell_style), Paragraph("Main application engine (11.7 KB) containing interactive grid, search bar, and equipment specification modals", table_cell_style)],
        [Paragraph("`SPORTS/src/components/SportsCard.jsx`", table_cell_style), Paragraph("Product card rendering equipment photo, sport category badge, stock status, and Quick Spec trigger", table_cell_style)],
        [Paragraph("`SPORTS/src/components/FilterBar.jsx`", table_cell_style), Paragraph("Filter bar with search input, sport category tabs, and in-stock toggle checkbox", table_cell_style)],
        [Paragraph("`SPORTS/src/App.css`", table_cell_style), Paragraph("Athletic emerald green stylesheet (2.2 KB) styling category tabs and gear specification modals", table_cell_style)]
    ]
    t_sports_f = Table(sports_files_data, colWidths=[2.2*inch, 4.5*inch])
    t_sports_f.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#15803D')), # Sports Emerald
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_sports_f)

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Technical Features & Spec Modal Views", h2_style))
    story.append(Paragraph("• <b>Multi-Sport Filtering Tabs:</b> Filter items by sport discipline: Soccer, Cricket, Tennis, Basketball, Gym & Fitness.", bullet_style))
    story.append(Paragraph("• <b>Equipment Specifications Modal:</b> Modal view displaying weight, material composition (e.g. Carbon Fiber, Synthetic Leather), and warranty details.", bullet_style))
    story.append(Paragraph("• <b>In-Stock Filter Toggle:</b> Instant checkbox filter hiding out-of-stock equipment items.", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("4. Code Highlights — Product Specification Modal State Logic (`App.jsx`)", h2_style))

    code_sports = """// SPORTS/src/App.jsx - Equipment Specification Modal Handler
const [selectedItem, setSelectedItem] = useState(null);

const openSpecModal = (item) => setSelectedItem(item);
const closeSpecModal = () => setSelectedItem(null);

{selectedItem !== null && (
  <div className="spec-modal-overlay" onClick={closeSpecModal}>
    <div className="spec-modal-content" onClick={e => e.stopPropagation()}>
      <h3>⚽ {selectedItem.name} Specifications</h3>
      <p>Material: {selectedItem.material} | Weight: {selectedItem.weight}</p>
      <p>Warranty: {selectedItem.warranty}</p>
      <button onClick={closeSpecModal}>Close Specifications</button>
    </div>
  </div>
)}"""
    t_code_sports = Table([[Paragraph(f"<pre>{code_sports}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_sports.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_sports)

    story.append(PageBreak())

    # ==========================================
    # PAGE 13: SUBMODULE 9 — SHOES EMPORIUM
    # ==========================================
    story.append(Paragraph("Submodule 9: SHOES Footwear Emporium (`/Shoes`)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Module Overview & Product Domain", h2_style))
    story.append(Paragraph(
        "The **SHOES Emporium Module** is a sneaker and footwear catalog featuring athletic running shoes, formal leather shoes, basketball high-tops, casual sneakers, and sandals. It includes brand taxonomy filters and an interactive UK/US size selector.",
        body_style
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2. File Blueprint & Component Architecture", h2_style))

    shoes_files_data = [
        [Paragraph("File Path", table_header_style), Paragraph("Component Role & Description", table_header_style)],
        [Paragraph("`Shoes/src/Shoes.jsx`", table_cell_style), Paragraph("Monolithic footwear application engine (20.0 KB) managing shoe brand filters, size pickers, and cart state", table_cell_style)],
        [Paragraph("`Shoes/src/Shoes.css`", table_cell_style), Paragraph("Footwear styling sheet (6.5 KB) with dynamic brand tag badges, size grid pills, and card hover effects", table_cell_style)],
        [Paragraph("`Shoes/src/main.jsx`", table_cell_style), Paragraph("Root mounting entry point connecting React component tree to DOM root", table_cell_style)]
    ]
    t_shoes_f = Table(shoes_files_data, colWidths=[2.2*inch, 4.5*inch])
    t_shoes_f.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#C2410C')), # Orange Shoe Accent
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_shoes_f)

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Technical Features & Size Matrix", h2_style))
    story.append(Paragraph("• <b>Interactive UK/US Size Matrix:</b> Size selection pills (UK 6 to UK 11 / US 7 to US 12) with real-time stock indicator updates.", bullet_style))
    story.append(Paragraph("• <b>Brand Taxonomy Filtering:</b> Filter catalog by major footwear brands (Nike, Adidas, Puma, Jordan, Reebok).", bullet_style))
    story.append(Paragraph("• <b>Footwear Cushioning Specs:</b> Displaying midsole technology tags (Air Cushioning, Boost Foam, Gel Comfort).", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("4. Code Highlights — Shoe Size Matrix & Stock Availability (`Shoes.jsx`)", h2_style))

    code_shoes = """// Shoes/src/Shoes.jsx - Shoe Size Matrix Selector
const [selectedSize, setSelectedSize] = useState(null);

const sizes = [
  { uk: 'UK 6', us: 'US 7', inStock: true },
  { uk: 'UK 7', us: 'US 8', inStock: true },
  { uk: 'UK 8', us: 'US 9', inStock: false },
  { uk: 'UK 9', us: 'US 10', inStock: true },
  { uk: 'UK 10', us: 'US 11', inStock: true }
];

const handleSizeSelect = (sizeObj) => {
  if (!sizeObj.inStock) return alert('Selected size is currently out of stock!');
  setSelectedSize(sizeObj.uk);
};"""
    t_code_shoes = Table([[Paragraph(f"<pre>{code_shoes}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_shoes.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_shoes)

    story.append(PageBreak())

    # ==========================================
    # PAGE 14: SUBMODULE 10 — TICKET BOOKING SYSTEM
    # ==========================================
    story.append(Paragraph("Submodule 10: TICKET BOOKING System (`/TICKETBOOKING`)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Module Overview & Entertainment Scope", h2_style))
    story.append(Paragraph(
        "The **TICKET BOOKING System Module** is a cinema and event ticket reservation platform. It includes an interactive 2D seating matrix, showtime scheduler, QR code generator, and a dedicated **Spiderman Special Feature Showcase** displaying movie schedules.",
        body_style
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Component Hierarchy & Core Engine", h2_style))

    ticket_files_data = [
        [Paragraph("File Path", table_header_style), Paragraph("Component Role & Description", table_header_style)],
        [Paragraph("`TICKETBOOKING/src/App.jsx`", table_cell_style), Paragraph("Largest application engine in workspace (42.7 KB) managing cinema seat matrix, showtime schedules, and booking state", table_cell_style)],
        [Paragraph("`TICKETBOOKING/src/TicketBooking.jsx`", table_cell_style), Paragraph("Custom Spiderman movie schedule display component (1.2 KB) showing IMAX showtimes", table_cell_style)],
        [Paragraph("`TICKETBOOKING/src/App.css`", table_cell_style), Paragraph("Cinema theme styling sheet (3.1 KB) rendering dark theater seating charts, screen glow, and ticket pass modals", table_cell_style)]
    ]
    t_ticket_f = Table(ticket_files_data, colWidths=[2.2*inch, 4.5*inch])
    t_ticket_f.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#B91C1C')), # Spiderman Cinema Red
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_ticket_f)

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Technical Features & Digital QR Pass", h2_style))
    story.append(Paragraph("• <b>2D Seating Matrix Grid:</b> Visual seat layout (Rows A-H, Seats 1-12) with occupied, available, and selected states.", bullet_style))
    story.append(Paragraph("• <b>Spiderman Movie Showcase:</b> Custom component highlighting Spiderman franchise showtimes, theater screen formats (IMAX 3D vs 2D), and cast details.", bullet_style))
    story.append(Paragraph("• <b>Digital QR Pass Generation:</b> Uses `react-qr-code` 2.2 to render a digital boarding ticket containing encrypted booking IDs upon confirmation.", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("4. Code Highlights — Dynamic Digital QR Pass Generation (`App.jsx`)", h2_style))

    code_ticket_qr = """// TICKETBOOKING/src/App.jsx - Digital Pass QR Generation
import QRCode from 'react-qr-code';

const DigitalTicketModal = ({ ticketData, onClose }) => (
  <div className="ticket-modal-overlay">
    <div className="ticket-pass-card">
      <h2>🎟️ Boarding Pass — {ticketData.movieTitle}</h2>
      <p>Seats: {ticketData.selectedSeats.join(', ')} | Theater: Screen 3 (IMAX)</p>
      <div className="qr-wrapper">
        <QRCode value={`PASS-${ticketData.bookingId}-${ticketData.selectedSeats.join('-')}`} size={135} />
      </div>
      <button onClick={onClose}>Done</button>
    </div>
  </div>
);"""
    t_code_tick_qr = Table([[Paragraph(f"<pre>{code_ticket_qr}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_tick_qr.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_tick_qr)

    story.append(PageBreak())

    # ==========================================
    # PAGE 15: TECHNICAL DEEP DIVE & CROSS-CUTTING PATTERNS
    # ==========================================
    story.append(Paragraph("Technical Deep Dive & Cross-Cutting Architecture", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Global State Management & Persistence Strategy", h2_style))
    story.append(Paragraph(
        "Across the project, state management balances high-performance local component state with global Context API providers. In the central hub (`src/App.jsx`), dark mode preferences are persisted across browser reloads using `localStorage` synchronization:",
        body_style
    ))

    code_theme_sync = """// src/App.jsx - LocalStorage Theme Sync Engine
const [darkMode, setDarkMode] = useState(() => {
  const saved = localStorage.getItem('darkMode');
  return saved !== null ? saved === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
});

useEffect(() => {
  document.documentElement.classList.toggle('dark-mode', darkMode);
  localStorage.setItem('darkMode', darkMode);
}, [darkMode]);"""
    t_code_t_sync = Table([[Paragraph(f"<pre>{code_theme_sync}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_t_sync.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_t_sync)

    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Design Tokens & Styling Architecture", h2_style))
    story.append(Paragraph(
        "The project strictly avoids heavy utility framework dependencies like TailwindCSS in favor of **Vanilla CSS Design Tokens** (`src/index.css` and `src/App.css`), ensuring custom glassmorphism, responsive grid layouts, and hardware-accelerated transitions.",
        body_style
    ))

    css_token_matrix = [
        [Paragraph("CSS Variable Token", table_header_style), Paragraph("Default Light Mode Value", table_header_style), Paragraph("Dark Mode Override Value", table_header_style)],
        [Paragraph("`--bg-primary`", table_cell_style), Paragraph("#F8FAFC (Ice Light)", table_cell_style), Paragraph("#0F172A (Deep Slate Navy)", table_cell_style)],
        [Paragraph("`--text-primary`", table_cell_style), Paragraph("#1E293B (Dark Slate)", table_cell_style), Paragraph("#F8FAFC (Pure Light)", table_cell_style)],
        [Paragraph("`--card-bg`", table_cell_style), Paragraph("rgba(255, 255, 255, 0.8)", table_cell_style), Paragraph("rgba(30, 41, 59, 0.7)", table_cell_style)],
        [Paragraph("`--border-glow`", table_cell_style), Paragraph("rgba(59, 130, 246, 0.2)", table_cell_style), Paragraph("rgba(96, 165, 250, 0.4)", table_cell_style)]
    ]
    t_token_m = Table(css_token_matrix, colWidths=[2.0*inch, 2.3*inch, 2.4*inch])
    t_token_m.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), C_PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 3.5),
    ]))
    story.append(t_token_m)

    story.append(Spacer(1, 4))
    story.append(Paragraph("3. Complete Repository Dependency Ecosystem", h2_style))

    dep_matrix_full = [
        [Paragraph("Package Name", table_header_style), Paragraph("Version", table_header_style), Paragraph("Architectural Role & Function in Workspace", table_header_style)],
        [Paragraph("`react` / `react-dom`", table_cell_style), Paragraph("v19.2.7", table_cell_style), Paragraph("Core UI component library & virtual DOM renderer engine", table_cell_style)],
        [Paragraph("`vite`", table_cell_style), Paragraph("v8.1.1", table_cell_style), Paragraph("Next-generation ES Module bundler & rapid dev server", table_cell_style)],
        [Paragraph("`framer-motion`", table_cell_style), Paragraph("v12.43.0", table_cell_style), Paragraph("Production motion engine powering carousel & card animations", table_cell_style)],
        [Paragraph("`axios`", table_cell_style), Paragraph("v1.18.1", table_cell_style), Paragraph("Promise-based HTTP client for API requests", table_cell_style)],
        [Paragraph("`react-icons`", table_cell_style), Paragraph("v5.7.0", table_cell_style), Paragraph("Icon packs (FontAwesome, Feather, Material Design Icons)", table_cell_style)],
        [Paragraph("`react-qr-code`", table_cell_style), Paragraph("v2.2.0", table_cell_style), Paragraph("SVG QR code generator for digital ticket passes", table_cell_style)],
        [Paragraph("`react-router-dom`", table_cell_style), Paragraph("v7.18.2", table_cell_style), Paragraph("Declarative SPA routing for submodule navigation", table_cell_style)]
    ]
    t_dep_m = Table(dep_matrix_full, colWidths=[1.7*inch, 0.9*inch, 4.1*inch])
    t_dep_m.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), C_PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [C_BG_LIGHT, colors.white]),
        ('PADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_dep_m)

    story.append(PageBreak())

    # ==========================================
    # PAGE 16: OPERATIONS & FUTURE ROADMAP
    # ==========================================
    story.append(Paragraph("Developer Operations & Strategic Roadmap", h1_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=C_PRIMARY, spaceBefore=0, spaceAfter=8))

    story.append(Paragraph("1. Developer Setup & Execution Blueprint", h2_style))
    story.append(Paragraph("To launch the central hub or any sub-application independently, execute the following commands:", body_style))

    code_op_hub = """# Command Sequence A: Launch Central Nithya Mart Portal Hub
cd c:\\Nithin_Academic\\MERN_Stack_Team_4
npm install
npm run dev
# Portal active at: http://localhost:5173"""
    t_code_op_h = Table([[Paragraph(f"<pre>{code_op_hub}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_op_h.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_op_h)

    story.append(Spacer(1, 4))
    code_op_sub = """# Command Sequence B: Launch Submodule Independently (e.g. BAG or TICKETBOOKING)
cd BAG  # or cd TICKETBOOKING, cd CHOCOLATES, etc.
npm install
npm run dev"""
    t_code_op_s = Table([[Paragraph(f"<pre>{code_op_sub}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_op_s.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_op_s)

    story.append(Spacer(1, 6))
    story.append(Paragraph("2. Git Subtree Operational Workflows", h2_style))
    story.append(Paragraph("For ongoing maintenance and team updates, use subtree pull/push commands:", body_style))

    code_sub_ops = """# Pull latest updates from developer branch into prefix folder
git subtree pull --prefix=BAG origin feature/bag-store --squash

# Push localized fixes back to submodule remote branch
git subtree push --prefix=TICKETBOOKING origin feature/ticket-booking"""
    t_code_sub_o = Table([[Paragraph(f"<pre>{code_sub_ops}</pre>", code_style)]], colWidths=[6.7*inch])
    t_code_sub_o.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), C_CODE_BG),
        ('BOX', (0, 0), (-1, -1), 1, C_SECONDARY),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_code_sub_o)

    story.append(Spacer(1, 6))
    story.append(Paragraph("3. Future Enhancements & Strategic Roadmap", h2_style))
    story.append(Paragraph("• <b>Unified JWT Authentication Microservice:</b> Centralize user authentication across all 10 sub-modules using JWT SSO tokens.", bullet_style))
    story.append(Paragraph("• <b>Cross-Module Multi-Merchant Cart:</b> Enable users to combine products from BAG, CHOCOLATES, and SHOES into a single checkout flow.", bullet_style))
    story.append(Paragraph("• <b>Automated CI/CD Pipeline:</b> Deploy GitHub Actions to automatically run unit tests and deploy static builds to AWS CloudFront / Vercel.", bullet_style))

    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1, color=C_BORDER, spaceBefore=4, spaceAfter=4))
    story.append(Paragraph("<b>End of Master Architectural Documentation — MERN Stack Team 4 (Nithya Mart)</b>", ParagraphStyle('DocEnd', fontName='Helvetica-Bold', fontSize=9, textColor=C_PRIMARY, alignment=1)))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated {pdf_filename}")

if __name__ == "__main__":
    create_documentation()
