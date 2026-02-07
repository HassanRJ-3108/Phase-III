@router.put("/{task_id}/toggle", response_model=TaskResponse)
async def toggle_task_completion(
    task_id: UUID,
    service: TaskService = Depends(get_task_service),
    current_user: TokenUser = Depends(get_current_user),
):
    """Toggle task completion status.

    Requires authentication. Uses JWT token to get user_id.
    """
    # Get current task
    task = service.get_task(current_user.user_id, task_id)
    
    # Toggle completion
    task_data = TaskUpdate(is_completed=not task.is_completed)
    return service.update_task(current_user.user_id, task_id, task_data)
