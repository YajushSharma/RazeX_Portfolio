"use client";

export default function TetrominoDivider() {
    return (
        <section className="relative h-24 md:h-24 flex items-center justify-center overflow-hidden bg-dark-900 -mb-[1px]">
            <div className="tetrominos">
                <div className="tetromino box1"></div>
                <div className="tetromino box2"></div>
                <div className="tetromino box3"></div>
                <div className="tetromino box4"></div>
            </div>
        </section>
    );
}
