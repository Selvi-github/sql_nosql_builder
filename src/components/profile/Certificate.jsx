import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = ({ name, date, logo, autoDownload, type = 'NoSQL' }) => {

    const hodSignatureCandidates = [
        '/assets/certificates/common/hod_signature.png?v=1',
        '/assets/certificates/common/hod_signature.jpg?v=1',
        '/assets/certificates/common/hod_signature.jpeg?v=1',
        '/assets/certificates/common/signature.png?v=1',
        '/assets/certificates/common/signature.jpg?v=1',
        '/assets/certificates/common/signature.jpeg?v=1'
    ];
    const [hodSignatureSrc, setHodSignatureSrc] = React.useState(hodSignatureCandidates[0]);

    const handleDownloadPdf = async () => {
        try {
            const element = document.getElementById('certificate-download');
            if (!element) return;

            const canvas = await html2canvas(element, {
                scale: 2, // Higher resolution
                useCORS: true, // Handle cross-origin images
                backgroundColor: '#ffffff',
                logging: false
            });
            const imgData = canvas.toDataURL('image/png');

            // A4 landscape dimensions in mm (297 x 210)
            const pdf = new jsPDF('l', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Certificate_${type}_${name.replace(/\s+/g, '_')}.pdf`);
        } catch (error) {
            console.error("PDF Download Error:", error);
            alert("PDF Download Failed: " + error.message + ". Please try downloading as Image.");
        }
    };

    const handleDownloadImage = async () => {
        try {
            const element = document.getElementById('certificate-download');
            if (!element) return;

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff'
            });
            const link = document.createElement('a');
            link.download = `Certificate_${type}_${name.replace(/\s+/g, '_')}.png`;
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Image Download Error:", error);
            alert("Image Download Failed: " + error.message);
        }
    };

    React.useEffect(() => {
        if (autoDownload) {
            const timer = setTimeout(() => {
                handleDownloadPdf();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [autoDownload]);

    return (
        <div style={styles.container}>
            <div id="certificate-download" style={styles.paper}>
                {/* Border Design */}
                <div style={styles.borderInner}>

                    {/* Header: Logo and College Name */}
                    <div style={styles.header}>
                        <div style={styles.logoContainerLeft}>
                            <img
                                src="/assets/kamaraj_logo.png?v=2"
                                alt="Kamaraj College Logo"
                                style={styles.logo}
                                crossOrigin="anonymous"
                                onError={(e) => {
                                    console.error("Logo Error:", e);
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                        {/* Right logo removed as requested */}
                        <div style={styles.collegeName}>
                            KAMARAJ COLLEGE OF ENGINEERING AND TECHNOLOGY
                        </div>
                    </div>

                    {/* Title */}
                    <div style={styles.title}>
                        CERTIFICATE OF COMPLETION
                    </div>

                    {/* Presented To */}
                    <div style={styles.presentedText}>
                        This is presented to :
                    </div>

                    {/* Name */}
                    <div style={styles.nameLine}>
                        <span style={styles.name}>{name}</span>
                    </div>

                    {/* Completion Text */}
                    <div style={styles.bodyText}>
                        Has successfully completed the <br />
                        <span style={styles.courseName}>{type.toUpperCase()} Database Mastery Certification Program</span>
                    </div>

                    {/* Seal and Signatures */}
                    <div style={styles.footer}>
                        <div style={styles.signatureBlock}>
                            <img
                                src={hodSignatureSrc}
                                alt="HOD e-sign"
                                style={styles.signatureImage}
                                crossOrigin="anonymous"
                                onError={(e) => {
                                    const currentIndex = hodSignatureCandidates.indexOf(hodSignatureSrc);
                                    const nextIndex = currentIndex + 1;
                                    if (nextIndex < hodSignatureCandidates.length) {
                                        setHodSignatureSrc(hodSignatureCandidates[nextIndex]);
                                        return;
                                    }
                                    console.error('HOD signature image not found. Tried:', hodSignatureCandidates);
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <div style={styles.signatureLine}></div>
                            <div style={styles.signatureLabel}>HOD<br />DEPARTMENT OF CSE</div>
                        </div>

                        <div style={styles.sealContainer}>
                            {/* Simple CSS Seal */}
                            <div style={styles.seal}>
                                <div style={styles.checkMark}>✓</div>
                            </div>
                        </div>

                        <div style={styles.signatureBlock}>
                            <div style={styles.dateText}>{date}</div>
                            <div style={styles.signatureLine}></div>
                            <div style={styles.signatureLabel}>DATE</div>
                        </div>
                    </div>

                </div>
            </div>
            {/* Download Buttons */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <button style={styles.printBtn} onClick={handleDownloadPdf}>Download PDF</button>
                <button style={{ ...styles.printBtn, backgroundColor: '#059669' }} onClick={handleDownloadImage}>Download Image</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'auto',
        backgroundColor: '#0f172a',
        padding: '20px'
    },
    paper: {
        width: '1000px', // Landscape A4 approx ratio
        maxWidth: '100%',
        height: '700px',
        backgroundColor: 'white',
        padding: '40px',
        position: 'relative',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        display: 'flex'
    },
    borderInner: {
        flex: 1,
        border: '5px solid #1e3a8a', // Dark Blue
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
        width: '100%'
    },
    logoContainerLeft: {
        position: 'absolute',
        top: '20px',
        left: '20px', // Top Left
        width: '100px',
        height: '100px'
    },
    logoContainerRight: {
        position: 'absolute',
        top: '20px',
        right: '20px', // Top Right
        width: '100px',
        height: '100px'
    },
    logo: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    collegeName: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#1e3a8a', // Dark Blue
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginTop: '20px', // Space for top margin
        maxWidth: '80%',
        fontFamily: 'serif'
    },
    title: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#1e3a8a',
        textTransform: 'uppercase',
        margin: '10px 0',
        letterSpacing: '2px',
        fontFamily: 'serif' // Classic look
    },
    presentedText: {
        fontSize: '20px',
        color: '#1e3a8a',
        margin: '10px 0',
        fontStyle: 'italic'
    },
    nameLine: {
        borderBottom: '2px solid #38bdf8', // Light Blue line
        paddingBottom: '5px',
        minWidth: '50%',
        textAlign: 'center',
        margin: '20px 0'
    },
    name: {
        fontSize: '42px',
        fontWeight: 'bold',
        color: '#1e3a8a', // Same color as text requested
        fontFamily: 'serif'
    },
    bodyText: {
        fontSize: '18px',
        color: '#1e3a8a',
        textAlign: 'center',
        maxWidth: '80%',
        lineHeight: '1.6',
        textTransform: 'uppercase'
    },
    courseName: {
        fontWeight: 'bold',
        fontSize: '22px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        marginTop: '40px',
        padding: '0 50px'
    },
    signatureBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px'
    },
    signatureLine: {
        width: '100%',
        height: '2px',
        backgroundColor: '#38bdf8', // Light Blue
        marginBottom: '10px'
    },
    signatureImage: {
        width: '100%',
        height: '48px',
        objectFit: 'contain',
        marginBottom: '6px'
    },
    signatureLabel: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#1e3a8a',
        textAlign: 'center'
    },
    dateText: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#1e3a8a',
        marginBottom: '5px' // "above the date" line
    },
    sealContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    seal: {
        width: '80px',
        height: '80px',
        backgroundColor: '#38bdf8', // Light Blue Seal
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    checkMark: {
        color: 'white',
        fontSize: '40px',
        fontWeight: 'bold'
    },
    printBtn: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold'
    },
};

export default Certificate;
