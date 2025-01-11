forward OnFindPathAsync(Path: path, task);
public OnFindPathAsync(Path: path, task)
{
    return SAMPNode_CallEvent("OnFindPathResponse", _:path, task);
}

forward FindPathAsync(MapNode: start, MapNode: target, task);
public FindPathAsync(MapNode: start, MapNode: target, task)
{
    return FindPathThreaded(start, target, "OnFindPathAsync", "i", task);
}