"use client";

import useAuthStore from "@/store/authStore";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ url }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
const user=useAuthStore.getState().user
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      
  <Document
  file={url}
  onLoadSuccess={onDocumentLoadSuccess}
>
  <div className="relative">
    <Page
      pageNumber={pageNumber}
      renderTextLayer={false}
      
       className="p-4"
  renderAnnotationLayer={false}
    />

    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="grid h-full w-full grid-cols-3 grid-rows-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="
              flex items-center justify-center
              rotate-[-30deg]
              text-xl font-bold
              text-black/10
              select-none
            "
          >
            {user?.fullName || "Inquistive Mind Academy"}
          </div>
        ))}
      </div>
    </div>
  </div>
</Document>

      <div className="flex items-center gap-4">
        <button
          disabled={pageNumber <= 1}
          onClick={() =>
            setPageNumber((p) => p - 1)
          }
        >
          Previous
        </button>

        <span>
          {pageNumber} / {numPages}
        </span>

        <button
          disabled={pageNumber >= numPages}
          onClick={() =>
            setPageNumber((p) => p + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}