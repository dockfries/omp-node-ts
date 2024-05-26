/*
    This is a polyfill that is complex to write to make samp-node compatible to call samp-cef.
*/

enum E_CefNatives
{
    DESTROY_BROWSER = 0,
    HIDE_BROWSER = 1,
    APPEND_TO_OBJECT = 2,
    REMOVE_FROM_OBJECT = 3,
    PLAYER_HAS_PLUGIN = 4,
    TOGGLE_DEV_TOOLS = 5,
    FOCUS_BROWSER = 6,
    ALWAYS_LISTEN_KEYS = 7,
};

forward CefNatives(...);
public CefNatives(...)
{
    new E_CefNatives:function_id = E_CefNatives:getarg(0);
    switch (function_id)
    {
        case DESTROY_BROWSER: return cef_destroy_browser(getarg(0, 1), getarg(0, 2));
        case HIDE_BROWSER: return cef_hide_browser(getarg(0, 1), getarg(0, 2), bool:getarg(0, 3));
        case APPEND_TO_OBJECT: return cef_append_to_object(getarg(0, 1), getarg(0, 2), getarg(0, 3));
        case REMOVE_FROM_OBJECT: return cef_remove_from_object(getarg(0, 1), getarg(0, 2), getarg(0, 3));
        case PLAYER_HAS_PLUGIN: return cef_player_has_plugin(getarg(0, 1));
        case TOGGLE_DEV_TOOLS: return cef_toggle_dev_tools(getarg(0, 1), getarg(0, 2), bool:getarg(0, 3));
        case FOCUS_BROWSER: return cef_focus_browser(getarg(0, 1), getarg(0, 2), bool:getarg(0, 3));
        case ALWAYS_LISTEN_KEYS: return cef_always_listen_keys(getarg(0, 1), getarg(0, 2), bool:getarg(0, 3));
    }
    return false;
}

forward PatchCefCreateBrowser(p, b, const u[], bool:h, bool:f);
public PatchCefCreateBrowser(p, b, const u[], bool:h, bool:f)
{
    return cef_create_browser(p, b, u, h, f);
}

forward PatchCefSubscribe(const e[], const c[]);
public PatchCefSubscribe(const e[], const c[])
{
    return cef_subscribe(e, c);
}

forward PatchCefCreateExtBrowser(p, b, const t[], const u[], s);
public PatchCefCreateExtBrowser(p, b, const t[], const u[], s)
{
    return cef_create_ext_browser(p, b, t, u, s);
}

forward PatchCefSetAudioSettings(p, b, Float:m, Float:r);
public PatchCefSetAudioSettings(p, b, Float:m, Float:r)
{
    return cef_set_audio_settings(p, b, m, r);
}

forward PatchCefLoadUrl(p, b, const u[]);
public PatchCefLoadUrl(p, b, const u[])
{
    return cef_load_url(p, b, u);
}

forward PatchCefEmitEvent(p, const e[], const arg [], s);
public PatchCefEmitEvent(p, const e[], const arg [], s)
{
    if (s == 0) return cef_emit_event(p, e);
    if (s == 1) return cef_emit_event(p, e, arg[0], arg[1]);
    if (s == 2) return cef_emit_event(p, e, arg[0], arg[1], arg[2], arg[3]);
    if (s == 3) return cef_emit_event(p, e, arg[0], arg[1], arg[2], arg[3], arg[4], arg[5]);
    if (s == 4) return cef_emit_event(p, e, arg[0], arg[1], arg[2], arg[3], arg[4], arg[5], arg[6], arg[7]);
    if (s == 5) return cef_emit_event(p, e, arg[0], arg[1], arg[2], arg[3], arg[4], arg[5], arg[6], arg[7], arg[8], arg[9]);
    return 0;
}

