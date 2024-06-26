const taskEl = document.querySelector('.TaskPane');
if (taskEl) {
    const myTasksLinkEl = document.querySelector('.SidebarTopNavLinks-myTasksButton');
    const baseUrl = myTasksLinkEl.href.substring(0, myTasksLinkEl.href.lastIndexOf('/'));
    let task = {
        id: taskEl.dataset.taskId,
        name: taskEl.getAttribute('aria-label'),
        description: taskEl.querySelector('#TaskDescription .ProseMirror')?.textContent,
        dueDate: taskEl.querySelector('.DueDate-dateSpan')?.textContent,
        url: `${baseUrl}/${taskEl.dataset.taskId}`,
        projects: []
    };
    taskEl.querySelectorAll('.TaskProjects .TaskProjectTokenPill-name').forEach((taskProjectEl) => {
        task.projects.push({
            name: taskProjectEl.textContent,
            url: taskProjectEl.closest('.BaseLink').href
        })
    });
    console.log(task);
    const googleCalendarParams = new URLSearchParams({
        action: 'TEMPLATE',
        location: task.url,
        text: `📋${task.name}${task.dueDate ? ` [due${task.dueDate}]` : ''}`,
        details: `<a href="${task.url}">View task</a>\r\n\r\n<strong>Projects:</strong>${task.projects.length > 0 ? '<ul>' + task.projects.map((project) => {
            return `\r\n <li>${project.name}\r\n${project.url}</li>\r\n`
        }) + '</ul>' : 'None'}`
    });
    window.open(`https://www.google.com/calendar/render?${googleCalendarParams.toString()}`, "asanaTaskGoogleCal", "popup");
} else {
    alert('No open task was detected');
}
