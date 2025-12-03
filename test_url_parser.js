
function convertUrl(videoId) {
    let embedUrl = videoId;

    // Handle YouTube URLs
    if (videoId.includes('youtube.com') || videoId.includes('youtu.be')) {
        let ytId = '';

        if (videoId.includes('/shorts/')) {
            // Handle Shorts: youtube.com/shorts/ID
            ytId = videoId.split('/shorts/')[1].split('?')[0];
        } else if (videoId.includes('v=')) {
            // Handle Watch: youtube.com/watch?v=ID
            ytId = videoId.split('v=')[1].split('&')[0];
        } else if (videoId.includes('youtu.be/')) {
            // Handle Short Link: youtu.be/ID
            ytId = videoId.split('youtu.be/')[1].split('?')[0];
        }

        if (ytId) {
            embedUrl = `https://www.youtube.com/embed/${ytId}?autoplay=1`;
        }
    }
    return embedUrl;
}

const testCases = [
    { input: 'https://www.youtube.com/shorts/nyIxTKiPh9Q?si=flBNHmXXD2DdvB3G', expected: 'https://www.youtube.com/embed/nyIxTKiPh9Q?autoplay=1' },
    { input: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', expected: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1' },
    { input: 'https://youtu.be/dQw4w9WgXcQ', expected: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1' },
    { input: 'https://vimeo.com/123456', expected: 'https://vimeo.com/123456' }
];

let passed = true;
testCases.forEach((test, index) => {
    const result = convertUrl(test.input);
    if (result === test.expected) {
        console.log(`Test ${index + 1} PASSED`);
    } else {
        console.log(`Test ${index + 1} FAILED`);
        console.log(`  Input: ${test.input}`);
        console.log(`  Expected: ${test.expected}`);
        console.log(`  Actual:   ${result}`);
        passed = false;
    }
});

if (passed) {
    console.log('All tests passed!');
} else {
    console.log('Some tests failed.');
}
