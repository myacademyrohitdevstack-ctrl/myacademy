"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import useAuthStore from "@/store/authStore";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ExternalLink,
  Download,
  AlertCircle,
  Loader2,
  FileText,
  RefreshCw,
} from "lucide-react";

// Point PDF.js worker to local public path (same-origin, avoids CORS issues)
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

export default function PdfViewer({ url }) {
  const user = useAuthStore((state) => state.user);
  const containerRef = useRef(null);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [containerWidth, setContainerWidth] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [useIframeFallback, setUseIframeFallback] = useState(false);

  // Measure container width for responsive page sizing
  useEffect(() => {
    if (!containerRef.current) return;

    const measure = () => {
      if (containerRef.current) {
        // Leave room for padding
        const w = containerRef.current.clientWidth;
        setContainerWidth(Math.max(280, w - 32));
      }
    };

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, []);

  function onDocumentLoadSuccess({ numPages: loadedPages }) {
    setNumPages(loadedPages);
    setPageNumber(1);
    setLoadError(null);
  }

  function onDocumentLoadError(error) {
    console.error("PDF load error:", error);
    setLoadError(error?.message || "Failed to parse document structure.");
  }

  const handlePrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(Math.round((prev + 0.15) * 100) / 100, 2.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(Math.round((prev - 0.15) * 100) / 100, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
        <FileText className="h-10 w-10 text-slate-300 mb-2" />
        <p className="text-sm font-medium">No document file specified.</p>
      </div>
    );
  }

  // Calculate rendering width
  const renderWidth = containerWidth
    ? Math.min(containerWidth, 800) * scale
    : undefined;

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center w-full min-h-[420px] select-none"
    >
      {/* Top Toolbar */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 w-full px-3 py-2.5 mb-4 bg-slate-900/90 text-white backdrop-blur-md rounded-2xl shadow-md border border-slate-700/50">
        {/* Page Nav */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={handlePrevPage}
            aria-label="Previous page"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white disabled:opacity-40 disabled:hover:bg-slate-800 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-semibold px-2 min-w-[85px] text-center text-slate-200">
            {numPages ? `${pageNumber} / ${numPages}` : "Loading..."}
          </span>

          <button
            type="button"
            disabled={!numPages || pageNumber >= numPages}
            onClick={handleNextPage}
            aria-label="Next page"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white disabled:opacity-40 disabled:hover:bg-slate-800 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom & Rotate Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={scale <= 0.5}
            title="Zoom Out"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white disabled:opacity-40 transition"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono px-1.5 text-slate-300 min-w-[45px] text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            type="button"
            onClick={handleZoomIn}
            disabled={scale >= 2.5}
            title="Zoom In"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white disabled:opacity-40 transition"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleRotate}
            title="Rotate 90 degrees"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition ml-1"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-1.5">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new browser tab"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange-600/90 hover:bg-orange-600 text-white text-xs font-medium transition shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Tab</span>
          </a>

          <a
            href={url}
            download
            target="_blank"
            rel="noopener noreferrer"
            title="Download document file"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Main Document Content */}
      {useIframeFallback ? (
        <div className="w-full h-[650px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
          <iframe
            src={`${url}#toolbar=1`}
            className="w-full h-full border-0"
            title="Document PDF viewer"
          />
          <div className="absolute bottom-3 right-3">
            <button
              onClick={() => setUseIframeFallback(false)}
              className="text-xs bg-slate-900/80 hover:bg-slate-900 text-white px-3 py-1.5 rounded-xl shadow backdrop-blur transition"
            >
              Switch back to standard viewer
            </button>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center w-full max-w-full overflow-x-auto py-2">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-500">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                <p className="text-xs font-medium text-slate-600">
                  Loading PDF pages...
                </p>
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center py-12 px-4 max-w-md mx-auto text-center bg-red-50/70 border border-red-200 rounded-3xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 mb-3">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Unable to Render PDF Preview
                </h4>
                <p className="mt-1 text-xs text-slate-600 max-w-sm">
                  {loadError ||
                    "This file could not be decoded by the inline canvas renderer."}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => setUseIframeFallback(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Try Native Browser Embed
                  </button>

                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#D6451B] text-white text-xs font-semibold hover:bg-orange-700 transition shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open in New Tab
                  </a>
                </div>
              </div>
            }
          >
            <div className="relative shadow-2xl rounded-2xl overflow-hidden bg-white border border-slate-200">
              <Page
                pageNumber={pageNumber}
                width={renderWidth}
                rotate={rotation}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                onRenderSuccess={() => setPageLoading(false)}
                className="block mx-auto"
              />

              {/* Security Watermark Overlay */}
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                <div className="grid h-full w-full grid-cols-2 sm:grid-cols-3 grid-rows-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center rotate-[-30deg] text-xs sm:text-sm font-black text-slate-900/10 select-none tracking-wider uppercase"
                    >
                      {user?.fullName || "MyAcademy"}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Document>
        </div>
      )}
    </div>
  );
}
