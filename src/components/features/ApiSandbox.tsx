import React, { useState } from 'react';
import { Terminal, Play, Copy, Check, Code2, Eye, Loader2 } from 'lucide-react';
import { PERSONAL_INFO, SKILLS_DATA } from '../../data/portfolioData';

export const ApiSandbox: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('/api/v1/profile');
  const [simulatedLatency, setSimulatedLatency] = useState(150);
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(200);
  const [responseTime, setResponseTime] = useState<number | null>(34);
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const [responsePayload, setResponsePayload] = useState<any>({
    status: 'success',
    data: {
      name: PERSONAL_INFO.name,
      title: PERSONAL_INFO.title,
      location: PERSONAL_INFO.location,
      status: PERSONAL_INFO.status,
    },
    meta: {
      timestamp: new Date().toISOString(),
      server: 'Antigravity-Edge-Worker',
    },
  });

  const handleSend = () => {
    setIsLoading(true);
    setResponseStatus(null);
    setResponseTime(null);

    const start = performance.now();

    setTimeout(() => {
      let data: any = {};
      let status = 200;

      if (selectedEndpoint === '/api/v1/profile') {
        data = {
          name: PERSONAL_INFO.name,
          title: PERSONAL_INFO.title,
          location: PERSONAL_INFO.location,
          status: PERSONAL_INFO.status,
        };
      } else if (selectedEndpoint === '/api/v1/skills') {
        data = SKILLS_DATA.slice(0, 5);
      } else if (selectedEndpoint === '/api/v1/metrics') {
        data = {
          experience: PERSONAL_INFO.yearsExperience,
          appsShipped: PERSONAL_INFO.appsShipped,
          activeUsers: PERSONAL_INFO.totalUsers,
          uptime: '99.99%',
        };
      } else if (selectedEndpoint === '/api/v1/ping') {
        data = { pong: true, time: Date.now() };
        status = 201;
      }

      const elapsed = Math.round(performance.now() - start);
      setResponseTime(elapsed);
      setResponseStatus(status);
      setResponsePayload({
        status: 'success',
        statusCode: status,
        data,
        meta: {
          timestamp: new Date().toISOString(),
          latencyMs: elapsed,
          protocol: 'HTTP/2',
          security: 'TLS 1.3',
        },
      });
      setIsLoading(false);
    }, simulatedLatency);
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(responsePayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            ApiSandbox Inspector
          </h3>
          <p className="text-xs text-slate-400">
            Interactive RESTful API mock sandbox. Test endpoints, headers, latency simulation, and structured responses.
          </p>
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          {showCode ? <Eye className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
          {showCode ? 'View Demo' : 'View Code'}
        </button>
      </div>

      {showCode ? (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-300">
          <pre>{`// ApiSandbox route resolver
export async function mockFetch(endpoint: string, delayMs: number) {
  await new Promise(r => setTimeout(r, delayMs));
  const routes = {
    '/api/v1/profile': { status: 200, data: userProfile },
    '/api/v1/metrics': { status: 200, data: engineeringMetrics },
  };
  return routes[endpoint] || { status: 404, error: 'Not Found' };
}`}</pre>
        </div>
      ) : (
        <>
          {/* Request Control bar */}
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
              GET
            </span>

            <select
              value={selectedEndpoint}
              onChange={e => setSelectedEndpoint(e.target.value)}
              className="flex-1 min-w-[200px] px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              <option value="/api/v1/profile">/api/v1/profile (Developer Profile)</option>
              <option value="/api/v1/skills">/api/v1/skills (Tech Stack List)</option>
              <option value="/api/v1/metrics">/api/v1/metrics (Engineering KPIs)</option>
              <option value="/api/v1/ping">/api/v1/ping (Health Check)</option>
            </select>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Latency:</span>
              <select
                value={simulatedLatency}
                onChange={e => setSimulatedLatency(Number(e.target.value))}
                className="px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs"
              >
                <option value={0}>0ms (Instant)</option>
                <option value={150}>150ms (5G)</option>
                <option value={500}>500ms (Slow 3G)</option>
              </select>

              <button
                onClick={handleSend}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold shadow transition-all active:scale-95"
              >
                {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                Send
              </button>
            </div>
          </div>

          {/* Response Inspector */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-medium">Response</span>
                {responseStatus && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[11px]">
                    {responseStatus} OK
                  </span>
                )}
                {responseTime !== null && (
                  <span className="text-slate-400 font-mono text-[11px]">
                    ⏱️ {responseTime} ms
                  </span>
                )}
              </div>

              <button
                onClick={copyJson}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy JSON'}
              </button>
            </div>

            <div className="p-4 font-mono text-xs overflow-x-auto text-slate-300 max-h-72">
              {isLoading ? (
                <div className="flex items-center justify-center py-10 gap-2 text-cyan-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Executing HTTP GET request...</span>
                </div>
              ) : (
                <pre>{JSON.stringify(responsePayload, null, 2)}</pre>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
